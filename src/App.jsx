import { Home } from "./Home";
import { Footer } from "./components/Footer";
import Nav from "./components/Nav";
import { Drivers } from "./Drivers";
import { Constructors } from "./Constructors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ReactDOM } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="constructors" element={<Constructors />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
