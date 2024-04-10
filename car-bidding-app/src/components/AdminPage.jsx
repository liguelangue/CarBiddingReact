// admin up to date (wxm) but problem with delete function

import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
    const [carInfo, setCarInfo] = useState({
        vin: '',
        exterior_color: '',
        interior_color: '',
        make: '',
        model: '',
        fuel: '',
        year: '',
        list_time: '',
        list_price: '',
        current_mileage: '',
        car_type: '',
        canopymaterial: '',
        electric_range: '',
        fuel_range: '',
        seatnumber: '',
        boatload: '',
    });
    const [carImage, setCarImage] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCarInfo({ ...carInfo, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setCarImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(carInfo).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (carImage) {
            formData.append('image', carImage);
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}add-car/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle success (e.g., clear form, show success message)
        } catch (error) {
            setError(error.response?.data?.message || 'Error adding car');
        }
    };

    const handleDeleteCar = async (vin) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}delete-car/${vin}/`);
            // Handle success (e.g., show success message, refresh car list)
        } catch (error) {
            setError(error.response?.data?.message || 'Error deleting car');
        }
    };

    return (
        <div className="admin-page">
            <h2>Add Car</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="vin" value={carInfo.vin} onChange={handleChange} placeholder="VIN" required />
                <input type="text" name="exterior_color" value={carInfo.exterior_color} onChange={handleChange} placeholder="Exterior Color" required />
                <input type="text" name="interior_color" value={carInfo.interior_color} onChange={handleChange} placeholder="Interior Color" required />
                <input type="text" name="make" value={carInfo.make} onChange={handleChange} placeholder="Make" required />
                <input type="text" name="model" value={carInfo.model} onChange={handleChange} placeholder="Model" required />
                <input type="text" name="fuel" value={carInfo.fuel} onChange={handleChange} placeholder="Fuel" required />
                <input type="number" name="year" value={carInfo.year} onChange={handleChange} placeholder="Year" required />
                <input type="datetime-local" name="list_time" value={carInfo.list_time} onChange={handleChange} placeholder="List Time" required />
                <input type="number" name="list_price" value={carInfo.list_price} onChange={handleChange} placeholder="List Price" required />
                <input type="number" name="current_mileage" value={carInfo.current_mileage} onChange={handleChange} placeholder="Current Mileage" required />


                {error && <div className="error-message">{error}</div>}
                <select name="car_type" value={carInfo.car_type} onChange={handleChange} required>
                    <option value="">Select Car Type</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Truck">Truck</option>
                </select>
                {carInfo.car_type === 'Sedan' && (
                    <input
                        type="number"
                        name="seatnumber"
                        value={carInfo.seatnumber}
                        onChange={handleChange}
                        placeholder="Seat Number"
                    />
                )}
                {carInfo.car_type === 'Convertible' && (
                    <input
                        type="text"
                        name="canopymaterial"
                        value={carInfo.canopymaterial}
                        onChange={handleChange}
                        placeholder="Canopy Material"
                    />
                )}
                {carInfo.car_type === 'Electric' && (
                    <input
                        type="number"
                        name="electric_range"
                        value={carInfo.electric_range}
                        onChange={handleChange}
                        placeholder="Electric Range"
                    />
                )}
                {carInfo.car_type === 'Hybrid' && (
                    <>
                        <input
                            type="number"
                            name="fuel_range"
                            value={carInfo.fuel_range}
                            onChange={handleChange}
                            placeholder="Fuel Range"
                        />
                        <input
                            type="number"
                            name="electric_range"
                            value={carInfo.electric_range}
                            onChange={handleChange}
                            placeholder="Electric Range"
                        />
                    </>
                )}
                {carInfo.car_type === 'SUV' && (
                    <input
                        type="number"
                        name="seatnumber"
                        value={carInfo.seatnumber}
                        onChange={handleChange}
                        placeholder="Seat Number"
                    />
                )}
                {carInfo.car_type === 'Truck' && (
                    <input
                        type="number"
                        name="boatload"
                        value={carInfo.boatload}
                        onChange={handleChange}
                        placeholder="Boat Load"
                    />
                )}
                <input type="file" name="image" onChange={handleImageChange} />
                <button type="submit">Add Car</button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <div className="delete-car-section">
                <h2>Delete Car</h2>
                <input
                    type="text"
                    name="delete_vin"
                    value={carInfo.delete_vin}
                    onChange={handleChange}
                    placeholder="VIN of car to delete"
                />
                <button onClick={() => handleDeleteCar(carInfo.delete_vin)}>Delete Car</button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );


}


export default AdminPage;