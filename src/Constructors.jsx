import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { readFromCache, writeToCache } from "./utils/cache";
import { getCachedData, getFreshData } from "./utils/request";

export function Constructors() {
  const [constructor, setConstructor] = useState([]);
  const [year, setYear] = useState(2023);
  const url = `https://ergast.com/api/f1/${year}/constructors.json`;

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
      }}
    >
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
