import React from "react";

import InfiniteScroll from "./InfiniteScroll";

import { action } from "@storybook/addon-actions";

const allItems = Array(500)
  .fill(0)
  .map((_, i) => `item ${i + 1}`);

const SimpleInfiniteScroll = (props: any) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      maxWidth: "100%",
      minWidth: "0px",
      minHeight: "0px",
    }}
  >
    <InfiniteScroll items={allItems} {...props}>
      {(item) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "24px",
            flexDirection: "column",
          }}
        >
          <p>{item}</p>
        </div>
      )}
    </InfiniteScroll>
  </div>
);

export default {
  title: "Components/InfiniteScroll",
  decorators: [],
  component: InfiniteScroll,
};

export const Default = (props) => <SimpleInfiniteScroll />;

export const show118thItem = () => <SimpleInfiniteScroll show={117} />;

export const useMarker = () => (
  <SimpleInfiniteScroll
    renderMarker={(marker) => (
      <div style={{ padding: "10px", background: "red" }}>{marker}</div>
    )}
  />
);

export const useReplace = () => <SimpleInfiniteScroll replace show={117} />;
