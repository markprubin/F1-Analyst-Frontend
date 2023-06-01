import { Box } from "@mui/material";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { DriverDataGrid } from "./components/DriverDataGrid";

import { SeasonPointsChart } from "./components/SeasonPointsChart";
import { ConstrPointsChart } from "./components/ConstrPointsChart";
import { ConstructorDataGrid } from "./components/ConstructorDataGrid";

export function Home() {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        overflow: "auto",
        flexgrow: 1,
        width: "100vw",
        display: "flex",
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", mt: 4, mb: 4 }}>
        <h1>F1 Analyst App</h1>
        <Grid container spacing={1}>
          <Grid xs={3}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 480 }}>
              <DriverDataGrid />
            </Paper>
          </Grid>
          <Grid xs={9}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 480 }}>
              <SeasonPointsChart />
            </Paper>
          </Grid>
          <Grid xs={3}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 480 }}>
              <ConstructorDataGrid />
            </Paper>
          </Grid>
          <Grid xs={9}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 480 }}>
              <ConstrPointsChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
