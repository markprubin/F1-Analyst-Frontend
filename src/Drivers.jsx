import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [year, setYear] = useState(2022);
  const yearsList = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`https://ergast.com/api/f1/${year}/drivers.json`);
        setDrivers(response.data.MRData.DriverTable.Drivers);
        console.log(response.data.MRData.DriverTable.Drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, [year]);

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Age"
            onChange={(event) => setYear(event.target.value)}
          >
            {yearsList(1950, 2023, 1).map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {drivers.map((driver) => (
        <Box
          sx={{
            display: "flex",
            marginLeft: 30,
          }}
        >
          <div key={driver.driverId}>
            <h2>
              {driver.givenName} {driver.familyName} <strong>({driver.code})</strong>
            </h2>
            Date of Birth: {driver.dateOfBirth}
            <br />
            Nationality: {driver.nationality}
            <br />
            <a href={driver.url}>More Info</a>
          </div>
        </Box>
      ))}
    </>
  );
}
