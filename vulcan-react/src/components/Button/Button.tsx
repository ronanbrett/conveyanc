import React, { Children, FC } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  label?: string;
  onClick?: () => void;

  children?: any;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.Button} {...props}>
      {children}
    </button>
  );
};

export default Button;
