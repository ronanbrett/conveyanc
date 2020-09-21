import React, { forwardRef, SyntheticEvent, useState } from "react";
import "./Button.scss";
import classNames from "classnames";

interface ButtonProps {
  a11yTitle?: any;
  buttonType?: "primary" | "outline";
  label?: string;
  size?: "small" | "medium" | "large";
  onClick?: (event?: any) => void;
  children?: any;
  [id: string]: any;
}

const Button = forwardRef(
  (
    {
      a11yTitle = "Button",
      active,
      align = "center",
      buttonType = "primary",
      color, // munged to avoid styled-components putting it in the DOM
      children,
      classes,
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
      size = "medium",
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

    if ((icon || label) && children) {
      console.warn(
        "Button should not have children if icon or label is provided"
      );
    }

    const wrappedClasses = classNames({
      Button: true,
      [`Button--${buttonType}`]: true,
      [`Button--${size}`]: true,
      active,
      focus,
      hover,
      selected,
    });

    return (
      <button
        className={`${wrappedClasses} ${classes}`}
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
