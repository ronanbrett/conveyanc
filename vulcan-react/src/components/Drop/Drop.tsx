import React, { forwardRef, useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";

import { getNewContainer, setFocusWithoutScroll } from "@core/utils/dom.utils";
import { DropContainer, DropProps } from "./DropContainer";
import { ContainerTargetContext } from "@core/contexts/ContainerTargetContext";

import "./Drop.scss";

const Drop = forwardRef(
  (
    {
      restrictFocus,
      target: dropTarget, // avoid DOM leakage
      trapFocus = true,
      ...rest
    }: Partial<DropProps>,
    ref
  ) => {
    const [originalFocusedElement, setOriginalFocusedElement] = useState<any>();
    useEffect(
      () => setOriginalFocusedElement(document.activeElement as HTMLElement),
      []
    );
    const [dropContainer, setDropContainer] = useState<HTMLElement>();

    const containerTarget = useContext(ContainerTargetContext);

    useEffect(() => setDropContainer(getNewContainer(containerTarget)), [
      containerTarget,
    ]);

    useEffect(
      () => () => {
        if (restrictFocus && originalFocusedElement) {
          if (originalFocusedElement.focus) {
            setFocusWithoutScroll(originalFocusedElement);
          } else if (
            originalFocusedElement.parentNode &&
            originalFocusedElement.parentNode.focus
          ) {
            // required for IE11 and Edge
            setFocusWithoutScroll(originalFocusedElement.parentNode);
          }
        }
        if (dropContainer && containerTarget) {
          containerTarget.removeChild(dropContainer);
        }
      },
      [containerTarget, dropContainer, originalFocusedElement, restrictFocus]
    );

    return dropContainer
      ? createPortal(
          <DropContainer
            ref={ref}
            dropTarget={dropTarget as HTMLElement}
            restrictFocus={restrictFocus}
            trapFocus={trapFocus}
            {...rest}
          />,
          dropContainer
        )
      : null;
  }
);

export default Drop;
