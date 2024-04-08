// Similar to Home.jsx
// Add button below each car's list
// Including VIN to each car's info
// given the function able to enter the auction where the car belongs to

// Add Header.jsx, HoLeftBar.jsx here
// CarList included in Home.jsx
// Hide Vin for each car's info
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLeftBar from './UsLeftBar';

function CarsWVin() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({ vin: '', exteriorColor: '', interiorColor: '', year: '' });
  const navigate = useNavigate();

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

  useEffect(() => {
    const filterCars = () => {
      let filtered = cars.filter(car => {
        return (!filters.vin || car.vin.includes(filters.vin)) &&
               (!filters.exteriorColor || car.exterior_color.toLowerCase() === filters.exteriorColor.toLowerCase()) &&
               (!filters.interiorColor || car.interior_color.toLowerCase() === filters.interiorColor.toLowerCase()) &&
               (!filters.year || car.year.toString() === filters.year);
      });
      setFilteredCars(filtered);
    };

    filterCars();
  }, [filters, cars]);
  
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  
  const goToAuction = (vin) => {
    navigate(`/auction/${vin}`);
  };

    return (
      <div className="user-cars-container">
      <UserLeftBar applyFilters={applyFilters} />
      <h2 className="user-cars-header">User-Cars</h2>
      {filteredCars.map((car, index) => (
        <div className="user-car-card" key={index}>
            <img className="user-car-image" src={car.image} alt={`${car.make} ${car.model}`} />
            {/* Car details */}
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