import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";

export function ConstrPointsChart() {
  const [constructorStandings, setConstructorStandings] = useState([]);

  // Grab Standings

  useEffect(() => {
    const fetchConstructorStandings = async () => {
      try {
        const response = await axios.get("https://ergast.com/api/f1/2023/5/constructorStandings.json");
        const standings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setConstructorStandings(standings);
      } catch (error) {
        console.error("Failed to fetch Constructor standings:", error);
      }
    };
    fetchConstructorStandings();
  }, []);

  // Chart
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (constructorStandings.length === 0) return;

    const constructorNames = constructorStandings.map((constructor) => `${constructor.Constructor.name}`);
    const points = constructorStandings.map((constructor) => parseInt(constructor.points));

    const chartData = {
      labels: constructorNames,
      datasets: [
        {
          label: "Total Points",
          data: points,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
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
  }, [constructorStandings]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 600,
      }}
    >
      <div>
        <canvas ref={chartContainerRef} style={{ width: "100vw", height: "100%" }}></canvas>
      </div>
    </Box>
  );
}
