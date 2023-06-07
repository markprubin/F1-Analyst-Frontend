import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export function DriverDataGrid() {
  const [driverStandings, setDriverStandings] = useState([]);

  const handleDriverStandings = () => {
    console.log("driverStandings");
    axios.get("http://ergast.com/api/f1/current/driverStandings.json").then((response) => {
      console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      setDriverStandings(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    });
  };

  useEffect(handleDriverStandings, []);

  const rows = driverStandings.map((driver) => ({
    id: driver.Driver.driverId,
    col1: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
    col2: driver.points,
  }));

  const columns = [
    { field: "col1", headerName: "Driver", width: 170 },
    { field: "col2", headerName: "Points", width: 40 },
  ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ overflowY: "scroll", height: "450px" }}
        hideFooter
        disableSelectionOnClick
      />
    </div>
  );
}
