// Similar to Home.jsx
// Add button below each car's list
// Including VIN to each car's info
// given the function able to enter the auction where the car belongs to

// Add Header.jsx, HoLeftBar.jsx here
// CarList included in Home.jsx
// Hide Vin for each car's info
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CarsWVin() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    console.log('API URL:', process.env.REACT_APP_API_URL);


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + '/cars');
                
                console.log(response.data);
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    const goToAuction = (vin) => {
      navigate(`/auction/${vin}`);
    };

    return (
        <div className="user-cars-container">
          <h2 className="user-cars-header">User-Cars</h2>
          {cars.map((car, index) => (
            <div className="user-car-card" key={index}>
              <img className="user-car-image" src={car.image} alt={`${car.make} ${car.model}`} />
              <div className="user-car-details">
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
            </div>
          ))}
        </div>
      );
    }

export default CarsWVin;
