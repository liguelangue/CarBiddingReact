// Similar to Home.jsx
// Add button below each car's list
// Including VIN to each car's info
// given the function able to enter the auction where the car belongs to

// Add Header.jsx, HoLeftBar.jsx here
// CarList included in Home.jsx
// Hide Vin for each car's info

// up to date -- wxm, Jason

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLeftBar from './UsLeftBar';
import Header from './UsHeader';
import { Link } from 'react-router-dom';
import Logo from './CarBidding.png';
import './UserPage.css';

function CarsWVin() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userid, setUserId] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);
  useEffect(() => {
    const userid = localStorage.getItem('userId'); // Corrected key
    if (userid) {
      setUserId(userid);
    }
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars`);
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const applyTextSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = cars.filter(car => 
      car.vin.toLowerCase().includes(lowercasedTerm) ||
      car.make.toLowerCase().includes(lowercasedTerm) ||
      car.exterior_color.toLowerCase().includes(lowercasedTerm) ||
      car.interior_color.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredCars(filtered);
  };

  const applySelectionFilters = (filters) => {
    const filtered = cars.filter(car => 
      (!filters.make || car.make === filters.make) &&
      (!filters.exteriorColor || car.exterior_color === filters.exteriorColor) &&
      (!filters.interiorColor || car.interior_color === filters.interiorColor) &&
      (!filters.fuel || car.fuel === filters.fuel) &&
      (!filters.year || car.year.toString() === filters.year) &&
      (!filters.mileageRange || (function() {
        const [min, max] = filters.mileageRange.split('-').map(Number);
        return car.current_mileage >= min && car.current_mileage <= max;
      })())
    );
    setFilteredCars(filtered);
  };

  const goToAuction = (vin) => {
    navigate(`/auction/${vin}`);
  };

  return (
    <div className="user-cars-container">
           <header className="home-header">
                <img className='logo' src={Logo} alt="Car Bidding Logo" />
                <div className="header-title">
                    <h1>CarBiddingSystem</h1>
                </div>
                <br></br>
            </header>
      <nav className="app-nav">
          {/* <Link to="/" className="nav-link"><button className="btn">Home</button></Link> */}
          <Link to="/" className="nav-link"><button className="btn">Logout</button></Link>
          {/* <Link to="/create-account" className="nav-link"><button className="btn">Create Account</button></Link> */}
          <Link to="/admin-login" className="nav-link"><button className="btn">Admin Login</button></Link>
      </nav>
      <div className='user-login-info'>
      <h1>Welcome Login,</h1>
      <h2>{userEmail}</h2> 
      <h2> User ID: {userid}</h2>
      </div>
      <div className="user-cars-content">
      <UserLeftBar applyTextSearch={applyTextSearch} applySelectionFilters={applySelectionFilters} cars={cars} />
      <div className="user-car-list">
      {filteredCars.map((car, index) => (
        <div className="user-car-card" key={index}>
          <img className="user-car-image" src={car.image} alt={`${car.make} ${car.model}`} />
          <div className="user-car-details"> 
          <div className="user-car-make-model">
          <h3>{car.make} {car.model}</h3>
                </div> 
          <p>Exterior Color: {car.exterior_color}</p>
          <p>Interior Color: {car.interior_color}</p>
          <p>VIN: {car.vin}</p>
          <p>Fuel: {car.fuel}</p>
          <p>Year: {car.year}</p>
          <p>List Time: {car.list_time}</p>
          <p>List Price: ${car.list_price}</p>
          <p>Current Mileage: {car.current_mileage} miles</p>
          <br></br>
          <button onClick={() => goToAuction(car.vin)}>Join Bidding</button>
        </div>
        </div>
      ))}


      </div>
      </div>
      
 
              <div className="User-group-info">
              <p>Group Members: Anning Tian, Pingyi Xu, QinHao Zhang, Xinmeng Wu</p>
              <p>Class: CS5200 Database Management Systems</p>
              <p>Professor: Dr. Tehmina Amjad</p>
      </div>
    </div>
  );
}

export default CarsWVin;