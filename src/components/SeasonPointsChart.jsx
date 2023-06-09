import Chart from "chart.js/auto";
import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";

export function SeasonPointsChart() {
  const [driverStandings, setDriverStandings] = useState([]);

  const handleDriverStandings = () => {
    console.log("driverStandings");
    axios.get("http://ergast.com/api/f1/2023/driverStandings.json").then((response) => {
      console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      setDriverStandings(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    });
  };

  useEffect(handleDriverStandings, []);

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (driverStandings.length === 0) return;

    const driverNames = driverStandings.map((driver) => `${driver.Driver.givenName} ${driver.Driver.familyName}`);
    const points = driverStandings.map((driver) => parseInt(driver.points));

    const chartData = {
      labels: driverNames,
      datasets: [
        {
          label: "Total Points",
          data: points,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    if (chartRef.current) {
      // Update existing chart
      chartRef.current.data = chartData;
      chartRef.current.update();
    } else {
      // Create new chart
      const context = chartContainerRef.current.getContext("2d");
      chartRef.current = new Chart(context, {
        type: "bar",
        data: chartData,
        options: chartOptions,
      });
    }
  }, [driverStandings]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 600,
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <canvas ref={chartContainerRef}></canvas>
      </div>
    </Box>
  );
}
