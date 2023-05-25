import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
      <Box sx={{ minWidth: 120, ml: 4, mt: 4, maxWidth: 400 }}>
        <Typography variant="h2" sx={{ display: "block", mb: 4 }}>
          Driver List
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Year Selection:
        </Typography>
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
      <Box
        sx={{
          width: "100vw",
        }}
      >
        <Grid container spacing={4} sx={{ mt: 2, ml: 4 }}>
          {drivers.map((driver) => (
            <Grid item xs={12} sm={6} md={4} key={driver.driverId}>
              <Card sx={{ maxWidth: 400 }}>
                <Typography variant="h4">
                  {driver.givenName} {driver.familyName} {driver.code ? <strong>({driver.code})</strong> : null}
                </Typography>
                <Typography variant="h5">Date of Birth: {driver.dateOfBirth}</Typography>
                <Typography variant="h6">Nationality: {driver.nationality}</Typography>
                <Typography variant="h6">
                  <a href={driver.url}>More Info</a>
                </Typography>
                <img src="https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=Albert_Einstein" />
                <br />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
