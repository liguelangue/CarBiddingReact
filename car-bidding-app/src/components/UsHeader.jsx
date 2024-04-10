// samiliar to HoHeader.jsx, add user_info to header
// add Log_out button for back to main page use
// up to date - wxm, Jason

import React from 'react';

function Header({ userEmail, userId }) {
    return (
      <div className="User-header">
        <div className="user-info">
          <span>Welcome login</span>
          <br/>
          <span>User Email:  {userEmail} </span>
          <br/>
          <span>User ID: {userId} </span>
        </div>
      </div>
    );
  }
export default Header;
