import { Home } from "./Home";
import { Footer } from "./components/Footer";

import { ResponsiveAppBar } from "./components/ResponsiveAppBar";
import { Drivers } from "./Drivers";
import { SeasonPointsChart } from "./components/SeasonPointsChart";
import { Constructors } from "./Constructors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/constructors" element={<Constructors />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
