import React from "react";
import { render } from "@testing-library/react";
import InfiniteScroll from "./InfiniteScroll";
import { create } from "react-test-renderer";

const simpleItems = (value: any) =>
  Array(value)
    .fill(0)
    .map((_, i) => `item ${i + 1}`);

const createPageItems = (allChildren: any) => {
  const unfiltered = Array.from(allChildren);
  // Removing any children which are serving as refs
  return unfiltered.filter((childItem: any) =>
    childItem.outerHTML.includes("item")
  );
};

describe("InfiniteScroll", () => {
  const items: any = [];
  while (items.length < 50) items.push(items.length);
  it("renders without error", () => {
    const component = create(
      <div>
        <InfiniteScroll step={3} items={items}>
          {(item: any, index: any, ref: any): any => (
            <div ref={ref} key={index}>
              {item}
            </div>
          )}
        </InfiniteScroll>
      </div>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
