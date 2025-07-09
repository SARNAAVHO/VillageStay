// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About"; // create this if needed
import MainLayout from "./layouts/MainLayout";
import BecomeHost from "./pages/BecomeHost";
import CreateListing from "./pages/CreateListings";
import YourListings from "./pages/YourListings";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/becomehost" element={<BecomeHost />}/>
          <Route path="/CreateListings" element={<CreateListing/>} />
          <Route path="/yourlistings" element={<YourListings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
