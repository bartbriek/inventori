import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.css';

function SelectionComponent() {
  const [selectedRegion, setSelectedRegion] = useState('-');
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3010/accounts').then(
      response => {
        setAccountId(response.data.body.account_id);
      },
      [accountId],
    );
  });

  // Region Selection
  const handleSelectChange = async event => {
    setSelectedRegion(event.target.value);
  };

  // Button
  const handleRegionButtonClick = async () => {
    try {
      await axios.put(`http://localhost:3010/regions/${selectedRegion}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id='selection-component'>
      <div>
        <h1>Inventori</h1>
        <div>
          <label id='accounts-heading'>
            <strong>Account ID</strong>
          </label>
          <label>{accountId}</label>
        </div>
      </div>
      <div>
        <label id='region-heading'>
          <strong>Region</strong>
        </label>
        <select name='regions' id='regions' onChange={handleSelectChange}>
          <option value='-'>choose a region</option>
          <option value='us-east-1'>us-east-1</option>
          <option value='eu-west-1'>eu-west-1</option>
          <option value='eu-central-1'>eu-central-1</option>
        </select>
        <br />
      </div>
      <button id='inventori-button' onClick={handleRegionButtonClick}>
        Save
      </button>
      {/*<div>*/}
      {/*  <button onClick={visualizeResources}>Visualize resources</button>*/}
      {/*</div>*/}
    </div>
  );
}

export default SelectionComponent;
