import React, { FC } from "react";

import "./IconButton.scss";

interface IconButtonProps {
  icon: string;
  size?: "mini" | "default" | "large";
  children?: any;
}

const IconButton: FC<IconButtonProps> = ({ icon, size }) => {
  if (!size) {
    size = "default";
  }
  return (
    <button className={`icon-button icon-button--${size}`}>
      <div className="icon__container">
        <i className="material-icons">{icon}</i>
        <div className="icon__background"></div>
      </div>
    </button>
  );
};

export default IconButton;
