import { Box } from "@mui/material";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";

import { SeasonPointsChart } from "./components/SeasonPointsChart";

export function Home() {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        overflow: "auto",
        backgroundColor: "lightgrey",
        flexgrow: 1,
        width: "100vw",
        display: "flex",
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", mt: 4, mb: 4 }}>
        <h1>F1 Analyst App</h1>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
              <h3>Welcome to the F1 Analyst App!</h3>
              <Button href="https://www.formula1.com" color="error" variant="contained">
                F1 Main Website
              </Button>
            </Paper>
          </Grid>
          <Grid xs={4}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
              <h1>Grid 2</h1>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: "50%" }}>
              <SeasonPointsChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
