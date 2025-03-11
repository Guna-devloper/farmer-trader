// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Trade from "./pages/Trade";
import TradeNow from "./pages/TradeNow";
import Portfolio from "./pages/Portfolio";
import { PortfolioProvider } from "./context/PortfolioContext";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <AuthProvider>
    <PortfolioProvider>
            <Router>
      <Navbar />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/tradenow" element={<TradeNow />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Router>
      </PortfolioProvider> 
      </AuthProvider>
    );
};

export default App;
