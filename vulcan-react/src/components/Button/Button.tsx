import React, { forwardRef, SyntheticEvent, useState } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  a11yTitle?: any;

  label?: string;
  onClick?: (event?: any) => void;
  children?: any;
  [id: string]: any;
}

const Button = forwardRef(
  (
    {
      a11yTitle,
      active,
      align = "center",
      color, // munged to avoid styled-components putting it in the DOM
      children,
      disabled,
      icon,
      focusIndicator = true,
      gap = "small",
      fill, // munged to avoid styled-components putting it in the DOM
      href,
      kind: kindArg,
      label,
      onBlur,
      onClick,
      onFocus,
      onMouseOut,
      onMouseOver,
      plain,
      primary,
      reverse,
      secondary,
      selected,
      size,
      type = "button",
      as,
      ...rest
    }: Partial<ButtonProps>,
    ref
  ) => {
    const [focus, setFocus] = useState<boolean>();
    const [hover, setHover] = useState<boolean>(false);

    const onMouseOverButton = (event: SyntheticEvent) => {
      setHover(true);
      if (onMouseOver) {
        onMouseOver(event);
      }
    };

    const onMouseOutButton = (event: SyntheticEvent) => {
      setHover(false);
      if (onMouseOut) {
        onMouseOut(event);
      }
    };

    const domTag = !as && href ? "a" : as;

    if ((icon || label) && children) {
      console.warn(
        "Button should not have children if icon or label is provided"
      );
    }

    const wrappedClasses = `${styles.Button}  ${active ? "active" : ""} ${
      focus ? "focused" : ""
    } ${hover ? "hover" : ""}`.trim();

    return (
      <button
        className={`${wrappedClasses}`}
        onClick={onClick}
        ref={ref as any}
        aria-label={a11yTitle}
        disabled={disabled}
        onFocus={(event) => {
          setFocus(true);
          if (onFocus) {
            onFocus(event);
          }
        }}
        onBlur={(event) => {
          setFocus(false);
          if (onBlur) {
            onBlur(event);
          }
        }}
        onMouseOver={onMouseOverButton}
        onMouseOut={onMouseOutButton}
        type={!href ? type : undefined}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

// const Button = forwardRef(({ children, props }, ref));
// // const Button: FC<ButtonProps> = ({ children, ...props }) => {
// //   return (
// //     <button className={styles.Button} {...props}>
// //       {children}
// //     </button>
// //   );
// // };

export default Button;
