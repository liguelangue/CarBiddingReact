// should link with AcutBidHead.jsx, BidRecive.jsx, BidSubmit.jsx, CarNBid.jsx
//Xinmeng Wu
// up to date -wxm
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BidSubmitBar from './BidSubmit';
import BidRecive from './BidRecive';

function AuctBidPage() {
    const [cars, setCars] = useState([]);
    const { vin } = useParams();
    //const navigate = useNavigate();
    const [auctionId, setAuctionId] = useState(null);

    const [bidsRefreshKey, setBidsRefreshKey] = useState(0);

    const refreshBids = () => {
        setBidsRefreshKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        const fetchAuctionCarsByVin = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/auction/${vin}`);
                setCars(response.data.cars);
                setAuctionId(response.data.auction_id);
            } catch (error) {
                console.error('Error fetching cars for auction based on VIN:', error);
            }
        };

        fetchAuctionCarsByVin();
    }, [vin]);

//    const goToBid = (carId) => {
//        navigate(`/bid/${carId}`);
//    };

    return (
      <div className="auction-page-container">
        <div className="sidebar">
            <BidSubmitBar onBidSubmit={refreshBids}/>
        </div>
        <div className="auction-cars-container">
          <h2 className="auction-cars-header">Auction:{auctionId}</h2>
          {cars.length > 0 ? cars.map((car, index) => (
            <div className="auction-car-card" key={index}>
              <img className="auction-car-image" src={car.image} alt={`${car.make} ${car.model}`} />
              <div className="auction-car-details">
                <h3>{car.make} {car.model}</h3>
                <p>Exterior Color: {car.exterior_color}</p>
                <p>Interior Color: {car.interior_color}</p>
                <p>VIN: {car.vin}</p>
                <p>Fuel: {car.fuel}</p>
                <p>Year: {car.year}</p>
                <p>List Time: {car.list_time}</p>
                <p>List Price: ${car.list_price}</p>
                <p>Current Mileage: {car.current_mileage} miles</p>
              </div>
              <div className="bid-receive-container">
                  <BidRecive refreshKey={bidsRefreshKey}/>
              </div>
            </div>
          )) : <p>No cars available for this VIN.</p>}
        </div>
      </div>
      );
}

export default AuctBidPage;