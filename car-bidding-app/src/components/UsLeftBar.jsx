// for UserPage.jsx use
// samiliar to HoLeftBar, able to search car by its property
// up to date -- wxm, Jason


import React, { useState } from 'react';

function UserLeftBar({ applyTextSearch, applySelectionFilters, cars }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedExColor, setSelectedExColor] = useState('');
    const [selectedInColor, setSelectedInColor] = useState('');
    const [selectedFuel, setSelectedFuel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMileageRange, setSelectedMileageRange] = useState('');
    // ... additional states for range attribute ...

    // Unique attributes extracted from the cars for the select dropdowns
    const makes = Array.from(new Set(cars.map(car => car.make)));
    const exColors = Array.from(new Set(cars.map(car => car.exterior_color)));
    const inColors = Array.from(new Set(cars.map(car => car.interior_color)));
    const fuels = Array.from(new Set(cars.map(car => car.fuel)));
    const years = Array.from(new Set(cars.map(car => car.year)));
    const mileageRanges = [
      { label: "0 - 10,000", value: "0-10000" },
      { label: "10,001 - 20,000", value: "10001-20000" },
      { label: "20,001 - 30,000", value: "20001-30000" },
      // Add more ranges as needed
    ];
    // ... similarly extract unique colors, years, fuels, mileages, and price ranges

    const handleTextSearch = (e) => {
      e.preventDefault();
      applyTextSearch(searchTerm);
    };

    const handleSelectionSearch = (e) => {
      e.preventDefault();
      applySelectionFilters({
        make: selectedMake,
        exteriorColor: selectedExColor,
        interiorColor: selectedInColor,
        fuel: selectedFuel,
        year: selectedYear,
        mileageRange: selectedMileageRange,
        // ... pass other selected attributes
      });
    };

    return (
      <div className="filter-bar">
        {/* Text Search Form */}
        <form onSubmit={handleTextSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="VIN, Make, or Color"
          />
          <button type="submit">Search</button>
        </form>
  
        {/* Dropdown Selections Form */}
        <form onSubmit={handleSelectionSearch}>
        <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
          <option value="">Make</option>
          {makes.map(make => <option key={make} value={make}>{make}</option>)}
        </select>

        <select value={selectedExColor} onChange={(e) => setSelectedExColor(e.target.value)}>
          <option value="">Exterior Color</option>
          {exColors.map(color => <option key={color} value={color}>{color}</option>)}
        </select>

        <select value={selectedInColor} onChange={(e) => setSelectedInColor(e.target.value)}>
          <option value="">Interior Color</option>
          {inColors.map(color => <option key={color} value={color}>{color}</option>)}
        </select>

        <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
          <option value="">Fuel Type</option>
          {fuels.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Year</option>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>

        <select value={selectedMileageRange} onChange={(e) => setSelectedMileageRange(e.target.value)}>
          <option value="">Mileage Range</option>
        {mileageRanges.map(range => (
          <option key={range.value} value={range.value}>{range.label}</option>
        ))}
      </select>

        {/* Add more dropdowns for other attributes like year, mileage, price range, etc. */}
        
        <button type="submit">Search</button>
      </form>
      </div>
    );
}

export default UserLeftBar;