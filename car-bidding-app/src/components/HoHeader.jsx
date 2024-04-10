// Header for Home.jsx, should add UserLogin.jsx, 
// Admin.jsx and CreateAcc.jsx Headers, also add Logo 
// and title for layout
// up to date -- wxm, Jason
import React from 'react';
import { Link } from 'react-router-dom';


const HoHeader = () => {
    return (
        <header className="home-header">
            <div className="header-title">
                <h1>Group 8 CarBiddingSystem</h1>
            </div>
            <div className="group-info">
                <p>Group Members: Anning Tian, Pingyi Xu, QinHao Zhang, Xinmeng Wu</p>
                <p>Class: CS5200 Database Management Systems</p>
                <p>Professor: Dr. Tehmina Amjad</p>
            </div>
            <nav className="app-nav">
                <Link to="/" className="nav-link"><button className="btn">Home</button></Link>
                <Link to="/login" className="nav-link"><button className="btn">Login</button></Link>
                <Link to="/create-account" className="nav-link"><button className="btn">Create Account</button></Link>
                <Link to="/admin-login" className="nav-link"><button className="btn">Admin Login</button></Link>
            </nav>
        </header>
    );
};

export default HoHeader;
