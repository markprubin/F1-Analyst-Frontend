import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";

export function Circuits() {
  const [circuit, setCircuit] = useState([]);
  const [year, setYear] = useState(2023);
  const yearsList = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

  const handleCircuitInfo = () => {
    console.log("circuitInfo");
    axios.get(`http://ergast.com/api/f1/${year}/circuits.json`).then((response) => {
      console.log(response.data.MRData.CircuitTable.Circuits);
      setCircuit(response.data.MRData.CircuitTable.Circuits);
    });
  };

  useEffect(handleCircuitInfo, []);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" sx={{ display: "block", mb: 4 }}>
        Circuit List
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Year Selection:
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="year"
          onChange={(event) => setYear(event.target.value)}
        >
          {yearsList(1950, 2023, 1).map((year) => (
            <MenuItem value={year} key={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
