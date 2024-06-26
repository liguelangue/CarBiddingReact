import React, { useState } from 'react';
import axios from 'axios';
import "./BidSubmit.css"

function BidSubmitBar({ onBidSubmit }) {
  const [userIdInput, setUserIdInput] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [auctionId, setAuctionId] = useState('');
  const [vin, setVin] = useState('');

  const userId = localStorage.getItem('userId');
  console.log('User ID from SessionStorage:', userId);

  // 一个示例的VIN验证函数，实际上你需要根据业务需求来定义这个函数
  const validateVIN = (vin) => {
    // 这里仅是一个示例条件，实际条件可能更复杂
    return vin && vin.length === 17;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userIdInput || !auctionId || !vin || !bidAmount) {
      console.error('All fields are required');
      alert('Please fill in all fields.');
      return;
    }
  
    const trimmedUserIdInput = userIdInput.trim();
    const storedUserId = String(localStorage.getItem('userId')).trim();
    
    console.log('User ID from input:', trimmedUserIdInput);
    console.log('User ID from localStorage:', storedUserId);
    
    if (trimmedUserIdInput !== storedUserId) {
      console.error('Invalid User ID');
      alert('You can only use your own User ID to submit bids.');
      return;
    }
  
    if (!validateVIN(vin)) {
      console.error('Invalid VIN');
      alert('The VIN entered is invalid.');
      return;
    }
  
    const bidData = {
      user: trimmedUserIdInput,
      auction: auctionId,
      bid_amount: bidAmount,
      vin: vin,
    };
  
    console.log('Submitting bid:', bidData);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/bid/`, bidData);
      console.log('Bid submitted successfully:', response.data);
      setUserIdInput('');
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
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
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
