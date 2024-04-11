// Use for reciving the bid and showing to users
// Xinmeng Wu 4.8
// up to date - wxm
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BidReceive({ vin, refreshKey }) {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/receive_bid/`);
                const filteredBids = response.data.filter(bid => bid.vin === vin);
                // Sort bids by bid_time in descending order
                const sortedBids = filteredBids.sort((a, b) => new Date(b.bid_time) - new Date(a.bid_time));
                setBids(sortedBids);
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        fetchBids();
    }, [refreshKey, vin]);

    return (
        <div className="bid-receive-container">
            <ul>
                {bids.map((bid, index) => (
                    <li key={index}>
                        Bid ID: {bid.bid_id}, User ID: {bid.user}, Auction ID: {bid.auction}, 
                        Bid Amount: {bid.bid_amount}, Bid Time: {bid.bid_time}, 
                        Bid Win: {bid.bidwin ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BidReceive;

