// Add Header.jsx, HoLeftBar.jsx here
// CarList included in Home.jsx
// Hide Vin for each car's info

// up to date - wxm
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HoHeader from './HoHeader';
import HomeLeftBar from './HoLeftBar';
import './Home.css';

function Cars() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars`);
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    const applyTextSearch = (searchTerm) => {
        setHasSearched(true);
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = cars.filter(car =>
            car.make.toLowerCase() === lowercasedTerm
        );
        setFilteredCars(filtered);
    };

    const applySelectionFilters = (filters) => {
        setHasSearched(true);
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

    const displayCars = hasSearched ? filteredCars : cars;

    return (
      <div className="cars-page-container">
        <HoHeader />
        <div className="cars-content">
          <HomeLeftBar 
            applyTextSearch={applyTextSearch} 
            applySelectionFilters={applySelectionFilters} 
            cars={cars} 
          />
          <div className="car-list">
            {displayCars.map((car, index) => (
              <div className="car-card" key={index}>
                {/* Display the car image */}
                <img className="car-image" src={car.image} alt={`${car.make} ${car.model}`} />
                {/* Display car details */}
                <div className="car-details">
                <div className="car-make-model">
                  <h3>{car.make} {car.model}</h3>
                </div> 

                  <p>Exterior Color: {car.exterior_color}</p>
                  <p>Interior Color: {car.interior_color}</p>
                  <p>Fuel Type: {car.fuel}</p>
                  <p>Year: {car.year}</p>
                  {/* Other details can be included here, but we'll omit the VIN */}
                  <p>Mileage: {car.current_mileage} miles</p>
                  <p>Price: ${car.list_price}</p>
                  {/* If there are more details you want to display, add them here */}
                </div>
              </div>
            ))}
          </div>
        </div>
            <div className="group-info">
                <p>Group Members: Anning Tian, Pingyi Xu, QinHao Zhang, Xinmeng Wu</p>
                <p>Class: CS5200 Database Management Systems</p>
                <p>Professor: Dr. Tehmina Amjad</p>
            </div>
      </div>
    );
    
    
}

export default Cars;
