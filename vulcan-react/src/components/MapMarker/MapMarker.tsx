import React, { FC } from "react";
import { PureComponent } from "react";
import { Marker } from "react-map-gl";
import { GeocodeResult } from "@services/google.service";

const ICON = `M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z`;
const SIZE = 46;

export interface MarkerPoint {
  longitude: number;
  latitude: number;
}

export default class MapMarkers extends PureComponent<{
  data: GeocodeResult[];
  onClick?: (point: GeocodeResult) => void;
}> {
  render() {
    const { data, onClick } = this.props;

    return (
      data &&
      data.length &&
      data.map((point: GeocodeResult, index: number) => (
        <Marker
          key={`marker-${index}`}
          longitude={point?.geometry?.location?.lng}
          latitude={point?.geometry?.location?.lat}
        >
          <svg
            height={SIZE}
            viewBox="0 0 24 24"
            style={{
              cursor: "pointer",
              fill: "var(--highlight-color)",
              stroke: "none",
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
            onClick={() => onClick(point)}
          >
            <path d={ICON} />
          </svg>
        </Marker>
      ))
    );
  }
}
