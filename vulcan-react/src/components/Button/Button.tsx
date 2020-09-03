import React, { FC } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;

  children?: any;
}

const Button: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button className={styles.Button} {...props}>
      {label}
    </button>
  );
};

export default Button;
