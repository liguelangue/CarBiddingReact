// up to date -- wxm, Jason

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './CarBidding.png';
import './LoginPage.css'

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
          // Set userId in sessionStorage after successful login
          localStorage.setItem('userId', String(response.data.user_id));
          console.log('User ID set in localStorage:', localStorage.getItem('userId'));
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
           <header className="home-header">
                <img className='logo' src={Logo} alt="Car Bidding Logo" />
                <div className="header-title">
                    <h1>CarBiddingSystem</h1>
                </div>
                <br></br>
            </header>
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
      <div className="login-group-info">
              <p>Group Members: Anning Tian, Pingyi Xu, QinHao Zhang, Xinmeng Wu</p>
              <p>Class: CS5200 Database Management Systems</p>
              <p>Professor: Dr. Tehmina Amjad</p>
      </div>
    </div>

    
  )
}

export default LoginPage;