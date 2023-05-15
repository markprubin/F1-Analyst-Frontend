import { Box } from "@mui/material";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper } from "@mui/material";
import Chart from "chart.js/auto";

export function Home() {
  return (
    <Box
      // component="main"
      sx={{
        backgroundColor: "lightgrey",
        height: "100vh",
        overflow: "auto",
        flexgrow: 1,
        maxWidth: "lg",
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", mt: 4, mb: 4 }}>
        <h1>F1 Analyst App</h1>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "240" }}>
              <h1>Grid 1</h1>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "240" }}>
              <h1>Grid 2</h1>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "240" }}>
              <h1>Season Points</h1>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
