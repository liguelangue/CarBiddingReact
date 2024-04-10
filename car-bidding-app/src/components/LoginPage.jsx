// up to date -- wxm, Jason

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Login with:', { email, phone_number: phoneNumber });
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}login/`, {
            email,
            phone_number: phoneNumber
        });
        console.log(response.data)

        if (response.data && typeof response.data.email !== 'undefined') {
          localStorage.setItem('userEmail', email);
        } else {
          console.error('Unexpected response format:', response.data);
        }

        // Redirect to UserPage after successful login
        navigate(`/user/${encodeURIComponent(email)}`);  // Adjust the path as needed
    } catch (error) {
        if (error.response) {
            console.error('Error logging in:', error.response.data.message);
        } else {
            console.error('Error logging in:', error.message);
        }
    }
};


  return(
<div className="login-container">
      <div className="header-title">
        <h1>Group 8 CarBiddingSystem</h1>
      </div>

      <nav className="app-nav">
          <Link to="/" className="nav-link"><button className="btn">Home</button></Link>
          {/* <Link to="/login" className="nav-link"><button className="btn">Login</button></Link> */}
          <Link to="/create-account" className="nav-link"><button className="btn">Create Account</button></Link>
          <Link to="/admin-login" className="nav-link"><button className="btn">Admin Login</button></Link>
      </nav>
      <h2>User - Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;