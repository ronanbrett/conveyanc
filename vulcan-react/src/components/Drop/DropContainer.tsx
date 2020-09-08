import React, {
  forwardRef,
  KeyboardEvent,
  MutableRefObject,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { FocusedContainer, Keyboard } from "@components";

import { findScrollParents, findVisibleParent } from "@core/utils/dom.utils";

import { PortalContext } from "./portalContext";

const preventLayerClose = (event: KeyboardEvent) => {
  const key = event.keyCode ? event.keyCode : event.which;

  if (key === 27) {
    event.stopPropagation();
  }
};

const defaultAlign = { top: "top", left: "left" };
const defaultPortalContext: any = [];
const MAX_DROP_HEIGHT = 600;


const getTransformOriginStyle = (align: any) => {
  let vertical = 'top';
  if (align.bottom) {
    vertical = 'bottom';
  }
  let horizontal = 'left';
  if (align.right) {
    horizontal = 'right';
  }
  return `${vertical} ${horizontal}`;
}

export interface DropProps {
  align?: {
    top?: "top" | "bottom";
    bottom?: "top" | "bottom";
    right?: "left" | "right";
    left?: "left" | "right";
  };
  dropTarget: HTMLElement;
  elevation?: any;
  onClickOutside?: (...args: any[]) => any;
  id?: string;
  onEsc?: any;
  overflow?:
    | "auto"
    | "hidden"
    | "scroll"
    | "visible"
    | {
        horizontal?: "auto" | "hidden" | "scroll" | "visible";
        vertical?: "auto" | "hidden" | "scroll" | "visible";
      }
    | string;

  onKeyDown?: any;
  responsive?: boolean;
  restrictFocus?: boolean;
  stretch?: boolean | string;
  target?: HTMLElement;
  trapFocus?: boolean;
  plain?: boolean;
  children?: any;
}

export const DropContainer = forwardRef(
  (
    {
      align = { top: "top", left: "left" },
      children,
      dropTarget,
      elevation,
      onClickOutside,
      onEsc,
      onKeyDown,
      overflow = "auto",
      plain,
      responsive,
      restrictFocus,
      stretch = "width",
      trapFocus,
      ...rest
    }: DropProps,
    ref
  ) => {
    const portalContext = useContext(PortalContext) || defaultPortalContext;
    const portalId = useMemo(() => portalContext.length, [portalContext]);
    const nextPortalContext = useMemo(() => [...portalContext, portalId], [
      portalContext,
      portalId,
    ]);
    const dropRef = useRef<HTMLElement>();

    useEffect(() => {
      // We try to preserve the maxHeight as changing it causes any scroll
      // position to be lost. We set the maxHeight on mount and if the window
      // is resized.
      const place = (preserveHeight: boolean) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const target = dropTarget as HTMLElement;
        let iRef = (ref || dropRef) as MutableRefObject<HTMLElement>;
        const container = iRef?.current as HTMLElement;
        if (container && target) {
          // clear prior styling
          container.style.left = "";
          container.style.top = "";
          container.style.bottom = "";
          container.style.width = "";
          if (!preserveHeight) {
            container.style.maxHeight = "";
          }
          // get bounds
          const targetRect = findVisibleParent(target).getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          // determine width
          const width = Math.min(
            stretch
              ? Math.max(targetRect.width, containerRect.width)
              : containerRect.width,
            windowWidth
          );
          // set left position
          let left;
          if (align.left) {
            if (align.left === "left") {
              ({ left } = targetRect);
            } else if (align.left === "right") {
              left = targetRect.left + targetRect.width;
            }
          } else if (align.right) {
            if (align.right === "left") {
              left = targetRect.left - width;
            } else if (align.right === "right") {
              left = targetRect.left + targetRect.width - width;
            }
          } else {
            left = targetRect.left + targetRect.width / 2 - width / 2;
          }
          if (left + width > windowWidth) {
            left -= left + width - windowWidth;
          } else if (left < 0) {
            left = 0;
          }
          // set top or bottom position
          let top;
          let bottom;
          let maxHeight = containerRect.height;
          if (align.top) {
            if (align.top === "top") {
              ({ top } = targetRect);
            } else {
              top = targetRect.bottom;
            }

            // Calculate visible area underneath the control w.r.t window height
            const percentVisibleAreaBelow =
              100 - (targetRect.bottom / windowHeight) * 100;

            // Check whether it is within 20% from bottom of the window or
            // visible area to flip the control
            // DropContainer doesn't fit well within visible area when
            // percentVisibleAreaBelow value<=20%
            // There is enough space from DropContainer to bottom of the window
            // when percentVisibleAreaBelow>20%.

            if (windowHeight === top || percentVisibleAreaBelow <= 20) {
              // We need more room than we have.
              // We put it below, but there's more room above, put it above
              top = "";
              if (align.top === "bottom") {
                bottom = targetRect.top;
              } else {
                ({ bottom } = targetRect);
              }
              maxHeight = bottom;
              container.style.maxHeight = `${maxHeight}px`;
            } else if (top > 0) {
              maxHeight = windowHeight - top;
              container.style.maxHeight = `${maxHeight}px`;
            } else {
              maxHeight = windowHeight - top;
            }
          } else if (align.bottom) {
            if (align.bottom === "bottom") {
              ({ bottom } = targetRect);
            } else {
              bottom = targetRect.top;
            }
            maxHeight = bottom;
            container.style.maxHeight = `${maxHeight}px`;
          } else {
            // center
            top =
              targetRect.top + targetRect.height / 2 - containerRect.height / 2;
            maxHeight = windowHeight - top;
          }
          // if we can't fit it all, or we're rather close,
          // see if there's more room the other direction
          if (
            responsive &&
            (containerRect.height > maxHeight || maxHeight < windowHeight / 10)
          ) {
            // We need more room than we have.
            if (align.top && top > windowHeight / 2) {
              // We put it below, but there's more room above, put it above
              top = "";
              if (align.top === "bottom") {
                // top = Math.max(targetRect.top - containerRect.height, 0);
                // maxHeight = targetRect.top - top;
                bottom = targetRect.top;
              } else {
                // top = Math.max(targetRect.bottom - containerRect.height, 0);
                // maxHeight = targetRect.bottom - top;
                ({ bottom } = targetRect);
              }
              maxHeight = bottom;
            } else if (align.bottom && maxHeight < windowHeight / 2) {
              // We put it above but there's more room below, put it below
              bottom = "";
              if (align.bottom === "bottom") {
                ({ top } = targetRect);
              } else {
                top = targetRect.bottom;
              }
              maxHeight = windowHeight - top;
            }
          }
          container.style.left = `${left}px`;
          if (stretch) {
            // offset width by 0.1 to avoid a bug in ie11 that
            // unnecessarily wraps the text if width is the same
            // NOTE: turned off for now
            container.style.width = `${width + 0.1}px`;
          }
          // the (position:absolute + scrollTop)
          // is presenting issues with desktop scroll flickering
          if (top !== "") {
            container.style.top = `${top}px`;
          }
          if (bottom !== "") {
            container.style.bottom = `${windowHeight - bottom}px`;
          }
          if (!preserveHeight) {
            maxHeight = Math.min(maxHeight, MAX_DROP_HEIGHT);

            container.style.maxHeight = `${maxHeight}px`;
          }
        }
      };

      let scrollParents: any[];

      const addScrollListeners = () => {
        scrollParents = findScrollParents(dropTarget);
        scrollParents.forEach((scrollParent) =>
          scrollParent.addEventListener("scroll", place)
        );
      };

      const removeScrollListeners = () => {
        scrollParents.forEach((scrollParent) =>
          scrollParent.removeEventListener("scroll", place)
        );
        scrollParents = [];
      };

      const onClickDocument = (event: any) => {
        // determine which portal id the target is in, if any
        let clickedPortalId = null;
        let node = event.target as any;
        while (clickedPortalId === null && node !== document) {
          const attr = node.getAttribute("data-g-portal-id");
          if (attr !== null) clickedPortalId = parseInt(attr, 10);
          node = node.parentNode;
        }
        if (
          (onClickOutside && clickedPortalId === null) ||
          (onClickOutside && portalContext.indexOf(clickedPortalId) !== -1)
        ) {
          onClickOutside(event);
        }
      };

      const onResize = () => {
        removeScrollListeners();
        addScrollListeners();
        place(false);
      };

      addScrollListeners();
      window.addEventListener("resize", onResize);
      if (onClickOutside) {
        document.addEventListener("mousedown", onClickDocument);
      }

      place(false);

      return () => {
        removeScrollListeners();
        window.removeEventListener("resize", onResize);
        if (onClickOutside) {
          document.removeEventListener("mousedown", onClickDocument);
        }
      };
    }, [
      align,
      dropTarget,
      onClickOutside,
      portalContext,
      portalId,
      ref,
      responsive,
      restrictFocus,
      stretch,
    ]);

    useEffect(() => {
      if (restrictFocus) {
        const iRef = (ref || dropRef) as MutableRefObject<HTMLElement>;
        iRef.current.focus();
      }
    }, [ref, restrictFocus]);

    let content = (
      <div
        className="DropContainer"
        ref={(ref as any) || (dropRef as any)}
        // elevation={!plain ? elevation || "small" : undefined}
        tabIndex={-1}
        style={{
          transformOrigin: getTransformOriginStyle(align),
        }}
        // alignProp={align}
        // overflow={overflow}
        data-g-portal-id={portalId}
        {...rest}
      >
        {children}
      </div>
    );

    // if (theme.global.drop.background) {
    //   const dark = backgroundIsDark(theme.global.drop.background, theme);
    //   if (dark !== undefined && dark !== theme.dark) {
    //     content = (
    //       <ThemeContext.Provider value={{ ...theme, dark }}>
    //         {content}
    //       </ThemeContext.Provider>
    //     );
    //   }
    // }

    return (
      <PortalContext.Provider value={nextPortalContext as any}>
        <FocusedContainer
          onKeyDown={onEsc && preventLayerClose}
          trapFocus={trapFocus as boolean}
        >
          <Keyboard
            onEsc={
              onEsc
                ? (event: KeyboardEvent) => {
                    event.stopPropagation();
                    onEsc(event);
                  }
                : undefined
            }
            onKeyDown={onKeyDown}
            target="document"
          >
            {content}
          </Keyboard>
        </FocusedContainer>
      </PortalContext.Provider>
    );
  }
);
