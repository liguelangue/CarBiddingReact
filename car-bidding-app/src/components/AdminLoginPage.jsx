// Up to date -- wxm

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminLoginPage() {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin-login/`, {
                admin_id: adminId,
                password: password
            });
            // Redirect to Admin Dashboard or any other page after successful login
            navigate('/Admin-Page');  // Adjust the path as needed
        } catch (error) {
            if (error.response) {
                console.error('Error logging in:', error.response.data.message);
            } else {
                console.error('Error logging in:', error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="header-title">
                <h1>Group 8 CarBiddingSystem</h1>
            </div>
            <nav className="app-nav">
            <Link to="/" className="nav-link"><button className="btn">Home</button></Link>
            <Link to="/login" className="nav-link"><button className="btn">User Login</button></Link>
            <Link to="/create-account" className="nav-link"><button className="btn">Create Account</button></Link>
            {/* <Link to="/admin-login" className="nav-link"><button className="btn">Admin Login</button></Link> */}
            </nav>
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="login-form">
                <input
                    type="number"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="Admin ID"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLoginPage;
