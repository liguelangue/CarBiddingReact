import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BidSubmitBar from './BidSubmit';
import BidRecive from './BidRecive';
import { Link } from 'react-router-dom';

function AuctBidPage() {
    const [auctionCars, setAuctionCars] = useState([]);
    const [carDetails, setCarDetails] = useState({});
    const { vin } = useParams();
    const [auctionId, setAuctionId] = useState(null);

    const [bids, setBids] = useState([]);
    const [bidsRefreshKey, setBidsRefreshKey] = useState(0);

    const refreshBids = () => {
        setBidsRefreshKey(prevKey => prevKey + 1);
    };

    const formatBid = (bid) => {
        return bid !== null && bid !== undefined ? `$${Number(bid).toFixed(2)}` : 'No bids yet';
    };

    useEffect(() => {
        const fetchAuctionCarsByVin = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/auction/${vin}`);
                setAuctionCars(response.data.auction_cars);
                setAuctionId(response.data.auction_id);
    
                const carDetailsMap = {};
                response.data.car_details.forEach(car => {
                    carDetailsMap[car.vin] = car;
                });
                setCarDetails(carDetailsMap);
            } catch (error) {
                console.error('Error fetching cars for auction based on VIN:', error);
            }
        };
    
        fetchAuctionCarsByVin();
    }, [vin]);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/receive_bid/`);
                setBids(response.data);
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };
    
        fetchBids();
    }, [bidsRefreshKey]);

    const getLatestBidForVin = (vin) => {
      const bidsForVin = bids.filter(bid => bid.vin === vin);
      if (bidsForVin.length > 0) {
          const latestBid = bidsForVin.reduce((prev, current) => {
              return (new Date(current.bid_time) > new Date(prev.bid_time)) ? current : prev;
          });
          return latestBid.bid_amount;
      }
      return null;
  };

    const getHighestBidForVin = (vin) => {
        const bidsForVin = bids.filter(bid => bid.vin === vin);
        if (bidsForVin.length > 0) {
            return Math.max(...bidsForVin.map(bid => bid.bid_amount));
        }
        return null;
    };

    return (
        <div className="auction-page-container">
            <div className="header-title">
                <h1>Group 8 CarBiddingSystem</h1>
            </div>
            <nav className="app-nav">
                <Link to="/" className="nav-link"><button className="btn">Logout</button></Link>
                <Link to="/login" className="nav-link"><button className="btn">User Login</button></Link>
            </nav>
            <div className="sidebar">
                <BidSubmitBar onBidSubmit={refreshBids}/>
            </div>

            <div className="auction-cars-container">
    <h2 className="auction-cars-header">Auction: {auctionId}</h2>
    {auctionCars.length > 0 ? auctionCars.map((auctionCar, index) => {
        const car = auctionCar.vin;
        return (
            <div className="auction-car-card" key={index}>
                <img className="auction-car-image" src={carDetails[car.vin]?.image} alt={`Car ${car.make} ${car.model}`} />
                <div className="auction-car-details">
                    <h3>{car.make} {car.model}</h3>
                    <p>VIN: {car.vin}</p>
                    <p>Start Bid: {formatBid(auctionCar.start_bid)}</p>
                    <p>Latest Bid: {formatBid(getLatestBidForVin(car.vin))}</p>
                    <p>Highest Bid: {formatBid(getHighestBidForVin(car.vin))}</p>
                </div>
                <div className="bid-receive-container">
                    <BidRecive vin={car.vin} refreshKey={bidsRefreshKey}/>
                </div>
            </div>
        );
    }) : <p>No cars available for this auction.</p>}


                <div className="bid-receive-container">
                    <BidRecive refreshKey={bidsRefreshKey}/>
                </div>
            </div>
        </div>
    );
}

export default AuctBidPage;
