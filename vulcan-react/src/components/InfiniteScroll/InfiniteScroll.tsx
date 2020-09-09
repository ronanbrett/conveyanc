import React, {
  Component,
  FC,
  ReactChild,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { findDOMNode } from "react-dom";

import {
  findScrollParent,
  findScrollParents,
  isNodeAfterScroll,
  isNodeBeforeScroll,
} from "@core/utils/dom.utils";

import styles from "./InfiniteScroll.module.scss";

class Ref extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}

interface InfiniteScrollProps {
  children?: any;
  items: any[];
  show?: number;
  replace?: boolean;
  renderMarker?: (el: JSX.Element) => ReactElement;
  step: number;
  onMore?: () => void;
}

const InfiniteScroll = ({
  children,
  items,
  replace,
  onMore,
  renderMarker,
  step = 50,
  show,
}: InfiniteScrollProps) => {
  const lastPage = useMemo(() => Math.floor(items.length / step), [
    items.length,
    step,
  ]);

  const [beginPage, setBeginPage] = useState(0);

  const [endPage, setEndPage] = useState(
    show ? Math.floor((show + step) / step) - 1 : 0
  );

  const [pageHeight, setPageHeight] = useState<number>(0);
  const [pageArea, setPageArea] = useState<number>(0);
  const [multiColumn, setMultiColumn] = useState<boolean>();
  const [pendingLength, setPendingLength] = useState(0);

  const belowMarkerRef = useRef<HTMLElement>();
  const firstPageItemRef = useRef<HTMLElement>();
  const lastPageItemRef = useRef<HTMLElement>();
  const showRef = useRef<any>();

  useEffect(() => {
    if (firstPageItemRef.current && lastPageItemRef.current && !pageHeight) {
      const firstPageItemRefNode = findDOMNode(
        firstPageItemRef.current
      ) as Element;

      const lastPageItemRefNode = findDOMNode(
        lastPageItemRef.current
      ) as Element;

      /* eslint-disable react/no-find-dom-node */
      const beginRect = firstPageItemRef.current.getBoundingClientRect
        ? firstPageItemRef.current.getBoundingClientRect()
        : firstPageItemRefNode?.getBoundingClientRect();
      const endRect = lastPageItemRef.current.getBoundingClientRect
        ? lastPageItemRef.current.getBoundingClientRect()
        : lastPageItemRefNode?.getBoundingClientRect();

      // Need to adjust for cases such as show where first and last page item
      // refs can be much larger than the step.
      const initialPage = show ? Math.floor(show / step) : 0;
      const nextPageHeight =
        (endRect.top + endRect.height - beginRect.top) / (initialPage + 1);
      // Check if the items are arranged in a single column or not.
      const nextMultiColumn = nextPageHeight / step < endRect.height;
      const nextPageArea = endRect.height * endRect.width * step;
      setPageHeight(nextPageHeight);
      setPageArea(nextPageArea);
      setMultiColumn(nextMultiColumn);
    }
  }, [pageHeight, step, show]);

  useEffect(() => {
    let scrollParents: any[];

    const onScroll = () => {
      const scrollParent = scrollParents[0];

      // Determine the window into the first scroll parent
      let top;
      let height;
      let width;
      if (scrollParent === document) {
        top = document.documentElement.scrollTop || document.body.scrollTop;
        height = window.innerHeight;
        width = window.innerWidth;
      } else {
        top = scrollParent.scrollTop;
        const rect = scrollParent.getBoundingClientRect();
        ({ height, width } = rect);
      }

      // Figure out which pages we should make visible based on the scroll
      // window.
      const offset = height / 4;

      // nextBeginPage will increment/decrement when using replace, otherwise
      // the beginPage will be at 0.
      const nextBeginPage = replace
        ? Math.min(
            lastPage,
            Math.max(
              0,
              multiColumn
                ? Math.floor((Math.max(0, top - offset) * width) / pageArea)
                : Math.floor(Math.max(0, top - offset) / pageHeight)
            )
          )
        : 0;

      // Increment nextEndPage when nearing end of current page
      const nextEndPage = Math.min(
        lastPage,
        Math.max(
          (!replace && endPage) || 0,
          multiColumn
            ? Math.ceil(((top + height + offset) * width) / pageArea)
            : Math.floor((top + height + offset) / pageHeight)
        )
      );

      if (nextBeginPage !== beginPage) setBeginPage(nextBeginPage);
      if (nextEndPage !== endPage) setEndPage(nextEndPage);
    };

    if (pageHeight && belowMarkerRef.current) {
      scrollParents = findScrollParents(belowMarkerRef.current);
      scrollParents.forEach((scrollParent: HTMLElement) =>
        scrollParent.addEventListener("scroll", onScroll)
      );
      onScroll();
    }
    return () => {
      if (scrollParents) {
        scrollParents.forEach((scrollParent: HTMLElement) =>
          scrollParent.removeEventListener("scroll", onScroll)
        );
      }
    };
  }, [
    beginPage,
    endPage,
    lastPage,
    multiColumn,
    pageArea,
    pageHeight,
    replace,
  ]);

  useEffect(() => {
    if (onMore && endPage === lastPage && items.length >= pendingLength) {
      // remember we've asked for more, so we don't keep asking if it takes
      // a while
      setPendingLength(items.length + 1);
      onMore();
    }
  }, [endPage, items.length, lastPage, onMore, pendingLength, step]);

  // scroll to any 'show'
  useEffect(() => {
    // ride out any animation delays, 100ms empirically measured
    const timer = setTimeout(() => {
      if (show && showRef.current) {
        const showNode = showRef.current.scrollIntoView
          ? showRef.current
          : (findDOMNode(showRef.current) as HTMLElement);
        const scrollParent = findScrollParent(showNode);
        if (isNodeBeforeScroll(showNode, scrollParent as HTMLElement)) {
          showNode.scrollIntoView(true);
        } else if (isNodeAfterScroll(showNode, scrollParent as HTMLElement)) {
          showNode.scrollIntoView(false);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [show]);

  const firstIndex = beginPage * step;
  const lastIndex = Math.min((endPage + 1) * step, items.length) - 1;

  const result = [];

  if (replace && pageHeight && firstIndex) {
    let marker = (
      <div
        key="above"
        style={{
          height: `${beginPage * pageHeight}px`,
          flex: "none",
        }}
      />
    );
    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: "above" });
    }
    result.push(marker);
  }

  items.slice(firstIndex, lastIndex + 1).forEach((item, index) => {
    const itemsIndex = firstIndex + index;
    let ref;
    let child = children(item, itemsIndex, ref);

    // Set firstPageItemRef & lastPageItemRef if we don't know the pageHeight.
    if (!pageHeight && itemsIndex === 0) {
      // We pass the ref we want to the children render function.
      // If we don't see that our ref was set, wrap it ("the old way").
      child = children(item, itemsIndex, firstPageItemRef);
      if (child.ref !== firstPageItemRef) {
        child = (
          <Ref key="first" ref={firstPageItemRef as any}>
            {child}
          </Ref>
        );
      }
    }

    if (!pageHeight && (itemsIndex === step - 1 || itemsIndex === lastIndex)) {
      // If show && show > step, we only want a single lastPageItemRef and it
      // should be set at lastIndex. Ignore step - 1 scenario, otherwise will
      // create duplicates.
      child =
        show && show > step && itemsIndex === step - 1
          ? child
          : children(item, itemsIndex, lastPageItemRef);

      // We pass the ref we want to the children render function.
      // If we don't see that our ref was set, wrap it ("the old way").
      if (
        child.ref !== lastPageItemRef &&
        !(show && show > step && itemsIndex === step - 1)
      ) {
        child = (
          <Ref key="last" ref={lastPageItemRef as any}>
            {child}
          </Ref>
        );
      }
    }

    // Set showRef
    if (show && show === itemsIndex) {
      child = children(item, itemsIndex, showRef);
      if (child.ref !== showRef) {
        child = (
          <Ref key="show" ref={showRef}>
            {child}
          </Ref>
        );
      }
    }

    result.push(child);
  });

  if (endPage < lastPage || replace || onMore) {
    let marker = (
      <div
        key="below"
        ref={belowMarkerRef as any}
        style={{
          minHeight: `${replace ? (lastPage - endPage) * pageHeight : 0}px`,
          flex: "none",
        }}
      />
    );
    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: "below" });
    }
    result.push(marker);
  }

  return result as any;
};

export default InfiniteScroll;
