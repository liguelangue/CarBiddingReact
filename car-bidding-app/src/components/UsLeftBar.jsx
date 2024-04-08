// for UserPage.jsx use
// samiliar to HoLeftBar, able to search car by its property

import React, { useState } from 'react';

function UserLeftBar({ applyFilters }) {
    const [localVin, setLocalVin] = useState('');
    const [localExteriorColor, setLocalExteriorColor] = useState('');
    const [localInteriorColor, setLocalInteriorColor] = useState('');
    const [localYear, setLocalYear] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      applyFilters({
        vin: localVin,
        exteriorColor: localExteriorColor,
        interiorColor: localInteriorColor,
        year: localYear,
      });
    };
  
    return (
      <form className="filter-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={localVin}
          onChange={(e) => setLocalVin(e.target.value)}
          placeholder="Search by VIN"
        />
        <input
          type="text"
          value={localExteriorColor}
          onChange={(e) => setLocalExteriorColor(e.target.value)}
          placeholder="Exterior Color"
        />
        <input
          type="text"
          value={localInteriorColor}
          onChange={(e) => setLocalInteriorColor(e.target.value)}
          placeholder="Interior Color"
        />
        <input
          type="text"
          value={localYear}
          onChange={(e) => setLocalYear(e.target.value)}
          placeholder="Year"
        />
        <button type="submit">Search</button>
      </form>
    );
  }

export default UserLeftBar;
