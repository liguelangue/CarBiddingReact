// Use for reciving the bid and showing to users
// Xinmeng Wu 4.8
// up to date - wxm
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BidRecive({ refreshKey }) {
  const [bids, setBids] = useState([]);

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
  }, [refreshKey]);

  return (
    <div className="bid-receive-container">
      <h2>All Bids</h2>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>
            Bid ID: {bid.bid_id}, User ID: {bid.user}, Auction ID: {bid.auction}, 
            Bid Amount: {bid.bid_amount}, VIN: {bid.vin}, Bid Time: {bid.bid_time}, 
            Bid Win: {bid.bidwin ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BidRecive;