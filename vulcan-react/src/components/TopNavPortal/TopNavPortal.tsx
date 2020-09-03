import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const TopNavPortal: React.FC<any> = ({ children }: { children: any }) => {
  const topNavPortal = document.getElementById("topNavPortal") as HTMLElement;
  const el = document.createElement("div");

  useEffect(() => {
    topNavPortal.appendChild(el);
  });

  useEffect(() => {
    return () => topNavPortal.removeChild(el) as any;
  });

  return createPortal(children, el);
};

export default TopNavPortal;
