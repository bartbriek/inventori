import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.css';

const SelectionComponent = ({ handleSelectChange, setRegionFlag, region }) => {
  // Button
  const handleAccountRegionChangeClick = async () => {
    try {
      await axios.put(`http://localhost:3010/region/${region}`);
      setRegionFlag(true);
      await axios.get('http://localhost:3010/resources');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='menu-container'>
      <label id='region-heading'>
        <strong>Regions</strong>
      </label>
      <select
        id='regions-select'
        value={region}
        name='regions'
        onChange={handleSelectChange}
      >
        <option value='us-east-1'>us-east-1</option>
        <option value='eu-west-1'>eu-west-1</option>
        <option value='eu-central-1'>eu-central-1</option>
      </select>
      <button id='inventori-button' onClick={handleAccountRegionChangeClick}>
        Visualize
      </button>
    </div>
  );
};

export default SelectionComponent;
