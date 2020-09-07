import React from "react";

import TopNavPortal from "./TopNavPortal";

import { action } from "@storybook/addon-actions";

let modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "topNavPortal");
document.querySelector("body")!.appendChild(modalRoot);

export default {
  title: "Components/TopNavPortal",
  decorators: [],
  component: TopNavPortal,
};

export const Default = () => <TopNavPortal>Test Portal</TopNavPortal>;
