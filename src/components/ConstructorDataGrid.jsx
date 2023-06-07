import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export function ConstructorDataGrid() {
  const [constructorStandings, setConstructorStandings] = useState([]);

  const handleConstructorStandings = () => {
    console.log("constructorStandings");
    axios.get("http://ergast.com/api/f1/current/constructorStandings.json").then((response) => {
      console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
      setConstructorStandings(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    });
  };
  useEffect(handleConstructorStandings, []);

  const rows = constructorStandings.map((constructor) => ({
    id: constructor.Constructor.constructorId,
    col1: constructor.Constructor.name,
    col2: constructor.points,
  }));

  const columns = [
    { field: "col1", headerName: "Constructor", width: 150 },
    { field: "col2", headerName: "Points", width: 150 },
  ];

  return (
    <div>
      <DataGrid rows={rows} columns={columns} hideFooter sx={{ maxHeight: "450px" }} />
    </div>
  );
}
