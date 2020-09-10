import { GeocodeResult } from "@services/google.service";
import { MapMarkers } from "@components";
import React, { FC, useEffect, useState } from "react";
import MapGL, { FlyToInterpolator } from "react-map-gl";
import styles from "./ListingCreateAssistantPanel.module.scss";

interface ListingCreateAssistantPanelProps {
  geocode?: GeocodeResult;
  eircode?: string;
  children?: any;
}

const ListingCreateAssistantPanel: FC<ListingCreateAssistantPanelProps> = ({
  geocode,
  eircode,
  ...props
}) => {
  const [markers, setMarkers] = useState([]);
  const [isMarkerVisible, setIsMarkerVisible] = useState<boolean>(false);

  const [viewport, setViewport] = useState<any>({
    latitude: 53.344415,
    longitude: -8.261666,
    zoom: 6,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    if (!geocode) {
      return;
    }
    const { location } = geocode.geometry;
    setViewport({
      ...viewport,
      latitude: location.lat,
      longitude: location.lng,
      zoom: 16,
      transitionDuration: 1300,
      transitionInterpolator: new FlyToInterpolator(),
    });

    setMarkers([geocode]);
  }, [geocode]);

  const onTransitionStart = () => {
    console.log("off!");
    setIsMarkerVisible(false);
  };
  const onTransitionEnd = () => {
    console.log("on!");
    setIsMarkerVisible(true);
  };

  return (
    <div className={styles.ListingCreateAssistantPanel}>
      <MapGL
        {...viewport}
        onTransitionStart={onTransitionStart}
        onTransitionEnd={onTransitionEnd}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/robrett/ckev8rdxa6qwe1an4lb7rbdh5"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={CONFIG.Mapbox.MAP_TOKEN}
      >
        <MapMarkers data={markers}></MapMarkers>
      </MapGL>
    </div>
  );
};

export default ListingCreateAssistantPanel;
