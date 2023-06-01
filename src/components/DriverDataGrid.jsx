import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns = [
  { field: "col1", headerName: "Driver", width: 150 },
  { field: "col2", headerName: "Points", width: 150 },
];

export function DriverDataGrid() {
  return (
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
