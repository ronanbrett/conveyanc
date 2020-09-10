import React from "react";
import { render } from "@testing-library/react";
import MapMarkers from "./MapMarker";
import { GeocodeResult } from "@services/google.service";
import { create } from "react-test-renderer";

jest.mock("react-map-gl");

describe("MapMarker", () => {
  it("renders without error", () => {
    const data = [
      {
        formatted_address: "test",
        geometry: {
          location: {
            lat: 5,
            lng: 5,
          },
        },
      },
    ] as any;

    const component = create(<MapMarkers data={data} onClick={() => {}} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
