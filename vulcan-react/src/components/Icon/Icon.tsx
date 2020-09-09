import React, { FC, forwardRef } from "react";
import classNames from "classnames";

import "./Icon.scss";

interface IconProps {
  icon: string;
  size?: "mini" | "default" | "large";
  children?: any;
}

const Icon: FC<IconProps> = forwardRef(({ icon, size, ...props }, ref) => {
  const clases = classNames({ [`Icon--${size}`]: true });
  return (
    <div ref={ref as any} className={clases}>
      <i className="material-icons">{icon}</i>
      <div className="Icon__background"></div>
    </div>
  );
});

export default Icon;
