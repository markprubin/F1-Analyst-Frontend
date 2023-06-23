import React from "react";
import { useState } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = "pk.eyJ1IjoibWFya3BydWJpbiIsImEiOiJjbGo3dG9kM2UwYnh6M2ZwMXRsOGV2bXUzIn0.jFbwnvot0wi9K6UB-F-yxg";

export default function CircuitMap() {
  const [viewport, setViewport] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 3,
  });
  return (
    <Map
      initialViewState={viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/markprubin/clj7t744j002n01rdd7yf8taa"
      mapboxAccessToken={TOKEN}
      projection="globe"
    />
  );
}
