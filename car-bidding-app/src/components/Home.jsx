// Add Header.jsx, HoLeftBar.jsx here
// CarList included in Home.jsx
// Hide Vin for each car's info
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cars() {
    const [cars, setCars] = useState([]);

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

    return (
        <div className="cars-container">
          <h2 className="cars-header">Cars</h2>
          {cars.map((car, index) => (
            <div className="car-card" key={index}>
              <img className="car-image" src={car.image} alt={`${car.make} ${car.model}`} />
              <div className="car-details">
                <h3>{car.make} {car.model}</h3>
                <p>Exterior Color: {car.exterior_color}</p>
                <p>Interior Color: {car.interior_color}</p>
                {/* <p>VIN: {car.vin}</p> */}
                <p>Fuel: {car.fuel}</p>
                <p>Year: {car.year}</p>
                <p>List Time: {car.list_time}</p>
                <p>List Price: ${car.list_price}</p>
                <p>Current Mileage: {car.current_mileage} miles</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

export default Cars;
