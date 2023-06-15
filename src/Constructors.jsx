import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

import axios from "axios";
import { readFromCache, writeToCache } from "./utils/cache";
import { getCachedData, getFreshData } from "./utils/request";

export function Constructors() {
  const [constructor, setConstructor] = useState([]);
  const [year, setYear] = useState(2023);
  const url = `https://ergast.com/api/f1/${year}/constructors.json`;
  const yearsList = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

  useEffect(() => {
    const cachedConstructors = getCachedData(url);
    if (cachedConstructors) {
      setConstructor(cachedConstructors.MRData.ConstructorTable.Constructors);
    } else {
      getFreshData(url, true).then((response) => {
        setConstructor(response.data.MRData.ConstructorTable.Constructors);
      });
    }
  }, [year]);
  console.log(constructor);
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        width: "100vw",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography variant="h2" sx={{ display: "block", mb: 4 }}>
        Constructor List
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
      {constructor.map((constructor) => (
        <div key={constructor.constructorId}>
          <h3>{constructor.name}</h3>
          <h4>{constructor.nationality}</h4>
          <a href={constructor.url}>More Info</a>
        </div>
      ))}
    </Box>
  );
}
