// samiliar to HoHeader.jsx, add user_info to header
// add Log_out button for back to main page use
import React from 'react';

function Header({ userEmail }) {
  return (
    <div className="header">
      <h1>User Dashboard</h1>
      <div className="user-info">
        <span>Welcome, {userEmail}</span>
      </div>
    </div>
  );
}

export default Header;
