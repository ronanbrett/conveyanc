import React, {
  Children,
  cloneElement,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
} from "react";

const KEYS: { [id: number]: string } = {
  8: "onBackspace",
  9: "onTab",
  13: "onEnter",
  27: "onEsc",
  32: "onSpace",
  37: "onLeft",
  38: "onUp",
  39: "onRight",
  40: "onDown",
  188: "onComma",
  16: "onShift",
};

interface KeyboardProps {
  children?: any;
  onKeyDown?: (event: KeyboardEvent, ...args: any) => void;
  target?: string;
  [id: string]: any;
}

const Keyboard = ({ target, children, onKeyDown, ...props }: KeyboardProps) => {
  const onKeyDownHandler = useCallback(
    (event, ...rest) => {
      const key: number = event.keyCode ? event.keyCode : event.which;
      const callbackName = KEYS[key];

      if (callbackName && props[callbackName]) {
        props[callbackName](event, ...rest);
      }

      if (onKeyDown) {
        onKeyDown(event, ...rest);
      }
    },
    [onKeyDown, props]
  );

  useEffect(() => {
    if (target === "document") {
      document.addEventListener("keydown", onKeyDownHandler);
    }

    return () => {
      if (target === "document") {
        document.removeEventListener("keydown", onKeyDownHandler);
      }
    };
  }, [onKeyDownHandler, target]);

  return target === "document"
    ? children
    : cloneElement(Children.only(children), {
        onKeyDown: onKeyDownHandler,
      });
};

export default Keyboard;
