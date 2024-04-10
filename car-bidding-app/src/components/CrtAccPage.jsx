// up to date --- wxm

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [lastn, setLastn] = useState('');
    const [firstn, setFirstn] = useState('');
    const [seller, setSeller] = useState(false);
    const [bidder, setBidder] = useState(false);
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/create-account/`, {
                email,
                phone_number: phoneNumber,
                gender,
                age,
                lastn,
                firstn,
                seller,
                bidder,
                street,
                state,
                zip,
                country
            });
            navigate('/login');  // Redirect to the login page after account creation
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating account');
        }
    };

    return (
    <div className="create-account-container">
     <div className="header-title">
        <h1>Group 8 CarBiddingSystem</h1>
      </div>
        <nav className="app-nav">
          <Link to="/" className="nav-link"><button className="btn">Home</button></Link>
          <Link to="/login" className="nav-link"><button className="btn">Login</button></Link>
          {/* <Link to="/create-account" className="nav-link"><button className="btn">Create Account</button></Link> */}
          <Link to="/admin-login" className="nav-link"><button className="btn">Admin Login</button></Link>
        </nav>
            <h2>Create Account</h2>
            <form onSubmit={handleCreateAccount} className="create-account-form">
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
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    required
                />
                <input
                    type="text"
                    value={lastn}
                    onChange={(e) => setLastn(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    value={firstn}
                    onChange={(e) => setFirstn(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        checked={seller}
                        onChange={(e) => setSeller(e.target.checked)}
                    />
                    Seller
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={bidder}
                        onChange={(e) => setBidder(e.target.checked)}
                    />
                    Bidder
                </label>
                <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street"
                    required
                />
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    required
                />
                <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="ZIP Code"
                    required
                />
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    required
                />
                <button type="submit">Create Account</button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default CreateAccountPage;
