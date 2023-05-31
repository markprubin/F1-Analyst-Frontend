import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

export function Circuits() {
  const [circuit, setCircuit] = useState([]);

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Typography variant="h2" sx={{ display: "block", mb: 4 }}>
        Circuit List
      </Typography>
    </Box>
  );
}
