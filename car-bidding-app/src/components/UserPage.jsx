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

function CarsWVin() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
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
      <Header userEmail={userEmail} />
      <UserLeftBar applyTextSearch={applyTextSearch} applySelectionFilters={applySelectionFilters} cars={cars} />
      <h2 className="user-cars-header">Cars</h2>
      {filteredCars.map((car, index) => (
        <div className="user-car-card" key={index}>
          <img className="user-car-image" src={car.image} alt={`${car.make} ${car.model}`} />
          <h3>{car.make} {car.model}</h3>
          <p>Exterior Color: {car.exterior_color}</p>
          <p>Interior Color: {car.interior_color}</p>
          <p>VIN: {car.vin}</p>
          <p>Fuel: {car.fuel}</p>
          <p>Year: {car.year}</p>
          <p>List Time: {car.list_time}</p>
          <p>List Price: ${car.list_price}</p>
          <p>Current Mileage: {car.current_mileage} miles</p>
          <button onClick={() => goToAuction(car.vin)}>Join Bidding</button>
        </div>
      ))}
    </div>
  );
}

export default CarsWVin;