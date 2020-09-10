import React from "react";
import { render } from "@testing-library/react";
import ListingCard from "./ListingCard";
import { property } from "lodash-es";
import { PropertyDto } from "@core/api/graphql";

describe("ListingCard", () => {
  it("renders without error", () => {
    const property = {
      images: [
        {
          url: "test",
        },
      ],
    } as PropertyDto;
    const { container } = render(<ListingCard property={property} />);
    expect(container).toMatchSnapshot();
  });
});
