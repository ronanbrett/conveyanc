import { Button, Drop } from "@components";
import { useForwardedRef } from "@core/utils/refs.utils";
import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DropProps } from "../Drop/DropContainer";
import classNames from "classnames";
import "./DropButton.scss";

export interface DropButtonProps {
  a11yTitle: string;
  dropAlign?: {
    top?: "top" | "bottom";
    bottom?: "top" | "bottom";
    right?: "left" | "right";
    left?: "left" | "right";
  };
  disabled: boolean;
  dropContent: JSX.Element;
  dropTarget?: HTMLElement;
  dropProps?: DropProps;
  id: string;
  onClose?: (...args: any[]) => void;
  onOpen?: (...args: any[]) => void;
  onClick?: (...args: any[]) => void;
  open?: boolean;
  [param: string]: any;
}

const DropButton = forwardRef(
  (
    {
      a11yTitle = "Open Drop",
      disabled,
      dropAlign = { top: "bottom", left: "left" },
      dropProps,
      dropContent,
      dropTarget,
      id,
      open,
      onClick,
      onClose,
      onOpen,
      ...rest
    }: DropButtonProps,
    ref
  ) => {
    console.log(dropAlign);

    const buttonRef = useForwardedRef(ref) as MutableRefObject<any>;
    const [show, setShow] = useState<boolean>();
    useEffect(() => {
      if (open !== undefined && open !== show) {
        setShow(open);
      }
    }, [open, show]);

    const onDropClose = useCallback(
      (event) => {
        // if the user has clicked on our Button, don't do anything here,
        // handle that in onClickInternal() below.
        let node = event.target;
        while (node !== document && node !== buttonRef.current) {
          node = node.parentNode;
        }
        if (node !== buttonRef.current) {
          // don't change internal state if caller is driving
          if (open === undefined) setShow(false);
          if (onClose) onClose(event);
        }
      },
      [buttonRef, onClose, open]
    );

    const onClickInternal = useCallback(
      (event) => {
        if (!show) {
          setShow(true);
          if (onOpen) onOpen(event);
        } else {
          setShow(false);
          if (onClose) onClose(event);
        }
        if (onClick) onClick(event);
      },
      [onClick, onClose, onOpen, show]
    );

    const cx = classNames({
      DropButton: true,
      opened: open,
    });

    return (
      <>
        <Button
          id={id}
          classes={cx}
          ref={buttonRef}
          a11yTitle={a11yTitle}
          disabled={disabled}
          {...rest}
          onClick={onClickInternal}
        />
        {show && buttonRef.current && (
          <Drop
            id={id ? `${id}__drop` : undefined}
            restrictFocus
            align={dropAlign}
            target={dropTarget || buttonRef.current}
            onClickOutside={onDropClose}
            onEsc={onDropClose}
            {...dropProps}
          >
            {dropContent}
          </Drop>
        )}
      </>
    );
  }
);
export default DropButton;
