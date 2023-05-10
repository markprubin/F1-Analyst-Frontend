import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export function Constructors() {
  const [constructor, setConstructor] = useState([]);

  const handleConstructor = () => {
    console.log("handleConstructor");
    axios.get("https://ergast.com/api/f1/2023/constructors.json").then((response) => {
      console.log(response.data.MRData.ConstructorTable.Constructors);
      setConstructor(response.data.MRData.ConstructorTable.Constructors);
    });
  };

  useEffect(handleConstructor, []);

  return constructor.map((constructor) => (
    <Box
      sx={{
        display: "flex",
        marginLeft: 30,
      }}
    >
      <div key={constructor.constructorId}>
        <h3>{constructor.name}</h3>
        <h4>{constructor.nationality}</h4>
        <a href={constructor.url}>More Info</a>
      </div>
    </Box>
  ));
}
