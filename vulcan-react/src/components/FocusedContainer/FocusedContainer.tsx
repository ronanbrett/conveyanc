import React, { useEffect, useRef, useState } from "react";

import {
  getBodyChildElements,
  makeNodeFocusable,
  makeNodeUnfocusable,
} from "@core/utils/dom.utils";

const isNotAncestorOf = (child: HTMLElement) => (parent: HTMLElement) =>
  !parent.contains(child);

export type FocusedContainerProps = {
  hidden?: boolean;
  restrictScroll?: boolean;
  trapFocus: boolean;
  children: any;
  [param: string]: any;
};

const FocusedContainer = ({
  hidden = false,
  restrictScroll = false,
  children,
  trapFocus,
  ...rest
}: FocusedContainerProps) => {
  const [bodyOverflowStyle, setBodyOverflowStyle] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const removeTrap = () => {
      const child = ref.current as HTMLElement;
      getBodyChildElements()
        .filter(isNotAncestorOf(child))
        .forEach(makeNodeFocusable);
      if (restrictScroll) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };

    const handleTrapFocus = () => {
      const child = ref.current as HTMLElement;
      getBodyChildElements()
        .filter(isNotAncestorOf(child))
        .forEach(makeNodeUnfocusable);

      if (restrictScroll && bodyOverflowStyle !== "hidden") {
        setBodyOverflowStyle(document.body.style.overflow);
        document.body.style.overflow = "hidden";
      }
    };

    const timer = setTimeout(() => {
      if (!hidden && trapFocus) {
        handleTrapFocus();
      }
    }, 0);

    return () => {
      removeTrap();
      clearTimeout(timer);
    };
  }, [hidden, bodyOverflowStyle, restrictScroll, trapFocus]);

  return (
    <div ref={ref as any} aria-hidden={hidden} {...rest}>
      {children}
    </div>
  );
};
export default FocusedContainer;
