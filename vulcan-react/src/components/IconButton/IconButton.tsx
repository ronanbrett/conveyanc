import React, { FC } from "react";

import "./IconButton.scss";

interface IconButtonProps {
  icon: string;
  classes?: string;
  size?: "mini" | "default" | "large";
  children?: any;

  [param: string]: any;
}

const IconButton: FC<IconButtonProps> = ({ icon, size, classes, ...props }) => {
  if (!size) {
    size = "default";
  }
  return (
    <button
      type="button"
      className={`icon-button icon-button--${size} ${classes}`}
      {...props}
    >
      <div className="icon__container">
        <i className="material-icons">{icon}</i>
        <div className="icon__background"></div>
      </div>
    </button>
  );
};

export default IconButton;
