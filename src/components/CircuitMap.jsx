import React from "react";
import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = "pk.eyJ1IjoibWFya3BydWJpbiIsImEiOiJjbGo3dG9kM2UwYnh6M2ZwMXRsOGV2bXUzIn0.jFbwnvot0wi9K6UB-F-yxg";

export default function CircuitMap({ circuit }) {
  const [viewport, setViewport] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 3,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Map
        initialViewState={viewport}
        onViewportChange={setViewport}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/markprubin/clj7t744j002n01rdd7yf8taa"
        mapboxAccessToken={TOKEN}
        projection="globe"
      >
        {circuit.map((circuit) => (
          <Marker
            key={circuit.circuitId}
            latitude={Number(circuit.Location.lat)}
            longitude={Number(circuit.Location.long)}
          ></Marker>
        ))}
      </Map>
    </div>
  );
}
