// Use for submit the bid
// Xinmeng Wu Apr. 8
// up to date -- wxm
import React, { useState } from 'react';
import axios from 'axios';

function BidSubmitBar({ onBidSubmit }) {
  const [userId, setUserId] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [auctionId, setAuctionId] = useState('');
  const [vin, setVin] = useState('');

  // 一个示例的VIN验证函数，实际上你需要根据业务需求来定义这个函数
  const validateVIN = (vin) => {
    // 这里仅是一个示例条件，实际条件可能更复杂
    return vin && vin.length === 17;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !auctionId || !vin || !bidAmount) {
      console.error('All fields are required');
      alert('Please fill in all fields.');
      return;
    }

    if (!validateVIN(vin)) {
      console.error('Invalid VIN');
      alert('The VIN entered is invalid.');
      return;
    }

    const bidData = {
      user: userId,
      auction: auctionId,
      bid_amount: bidAmount,
      vin: vin,
    };

    console.log('Submitting bid:', bidData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/bid/`, bidData);
      console.log('Bid submitted successfully:', response.data);
      setUserId('');
      setAuctionId('');
      setVin('');
      setBidAmount('');
      
      if (onBidSubmit) {
        onBidSubmit(response.data); // Pass the response data for further processing
      }

    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('There was an error submitting your bid.');
    }
  };

  return (
    <div className="bid-submit-bar">
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <label>
          Auction ID:
          <input
            type="text"
            value={auctionId}
            onChange={(e) => setAuctionId(e.target.value)}
            required
          />
        </label>
        <label>
          VIN:
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            required
          />
        </label>
        <label>
          Bid Amount:
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            min="1"
            required
          />
        </label>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
}

export default BidSubmitBar;