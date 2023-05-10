import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";

export function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("https://ergast.com/api/f1/2023/drivers.json");
        setDrivers(response.data.MRData.DriverTable.Drivers);
        console.log(response.data.MRData.DriverTable.Drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  return drivers.map((driver) => (
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
  ));
}
