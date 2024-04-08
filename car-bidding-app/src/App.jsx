// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';  // Make sure this import is correct
import CrtAccPage from './components/CrtAccPage';
import Home from './components/Home';
import './App.css'; 
import UserPage from './components/UserPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminPage from './components/AdminPage';
import AuctBidPage from './components/AuctBidPage';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="app-header">Welcome to the Car Bidding System</h1>
        <nav className="app-nav">
            <Link to="/login" className="nav-link"><button className="btn">Login</button></Link>
            <Link to="/create-account" className="nav-link"><button className="btn">Create Account</button></Link>
            <Link to="/admin-login" className="nav-link"><button className="btn">Admin Login</button></Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CrtAccPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/auction/:vin" element={<AuctBidPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;