import { Home } from "./Home";
import { Footer } from "./components/Footer";
import Nav from "./components/Nav";
import { ResponsiveAppBar } from "./components/ResponsiveAppBar";
import { Drivers } from "./Drivers";
import { SeasonPointsChart } from "./components/SeasonPointsChart";
import { Constructors } from "./Constructors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ReactDOM } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Nav /> */}
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/constructors" element={<Constructors />} />
          <Route path="/points" element={<SeasonPointsChart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
