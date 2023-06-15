import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { readFromCache, writeToCache } from "./utils/cache";

export function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [year, setYear] = useState(2023);
  const yearsList = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const cacheKey = `drivers-${year}`;
        const cachedData = readFromCache(cacheKey);

        if (cachedData) {
          setDrivers(cachedData);
        } else {
          const response = await axios.get(`https://ergast.com/api/f1/${year}/drivers.json`);
          const driversData = response.data.MRData.DriverTable.Drivers;
          const driversWithImages = await Promise.all(
            driversData.map(async (driver) => {
              try {
                const wikiResponse = await axios.get(
                  `https://en.wikipedia.org/w/api.php?action=query&titles=${driver.givenName}_${driver.familyName}&prop=pageimages&format=json&origin=*&pithumbsize=500`
                );
                const pages = wikiResponse.data.query.pages;
                const pageId = Object.keys(pages)[0];
                const imageInfo = pages[pageId].thumbnail;
                const imageUrl = imageInfo ? imageInfo.source : "";
                return { ...driver, imageUrl };
              } catch (error) {
                console.error(`Error fetching Wikipedia data for ${driver.givenName} ${driver.familyName}:`, error);
                return driver;
              }
            })
          );

          setDrivers(driversWithImages);
          writeToCache(cacheKey, driversWithImages);
        }
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
      <Box
        sx={{
          width: "100vw",
        }}
      >
        <Grid container spacing={4} sx={{ mt: 2, ml: 4 }}>
          {drivers.map((driver) => (
            <Grid item xs={12} sm={6} md={4} key={driver.driverId}>
              <Paper elevation={6}>
                <Typography variant="h4">
                  {driver.givenName} {driver.familyName} {driver.code ? <strong>({driver.code})</strong> : null}
                </Typography>
                <Typography variant="h5">Date of Birth: {driver.dateOfBirth}</Typography>
                <Typography variant="h6">Nationality: {driver.nationality}</Typography>
                <Typography variant="h6">
                  <a href={driver.url}>More Info</a>
                </Typography>
                {driver.imageUrl && (
                  <img src={driver.imageUrl} alt="Driver" style={{ width: "50%", height: "50%", marginTop: "10px" }} />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
