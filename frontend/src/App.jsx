// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About"; // create this if needed
import MainLayout from "./layouts/MainLayout";
import BrowseStays from "./pages/BrowseStays";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/browsestays" element={<BrowseStays />}/>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
