import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import AdsList from "./pages/AdsList";
import ManageAd from "./pages/ManageAd";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<AdsList />} />
        <Route path="/manage-ad" element={<ManageAd />} />
        <Route path="/manage-ad/:id" element={<ManageAd />} />
      </Routes>
    </Router>
  );
};

export default App;
