import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { readFromCache, writeToCache } from "./utils/cache";
import { getCachedData, getFreshData } from "./utils/request";

export function Constructors() {
  const [constructor, setConstructor] = useState([]);
  const url = "https://ergast.com/api/f1/2002/constructors.json";

  // const handleConstructor = () => {
  //   console.log("handleConstructor");
  //   axios.get("https://ergast.com/api/f1/2008/constructors.json").then((response) => {
  //     console.log(response.data.MRData.ConstructorTable.Constructors);
  //     setConstructor(response.data.MRData.ConstructorTable.Constructors);
  //   });
  // };

  useEffect(() => {
    const cachedConstructors = getCachedData(url);
    if (cachedConstructors) {
      setConstructor(cachedConstructors.MRData.ConstructorTable.Constructors);
    } else {
      getFreshData(url, true).then((response) => {
        setConstructor(response.data.MRData.ConstructorTable.Constructors);
      });
    }
  }, []);
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
