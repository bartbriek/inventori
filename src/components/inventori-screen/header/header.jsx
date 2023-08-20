import './header.css';
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../baseConfig';
import { MenuItem, Select, InputLabel } from '@mui/material';

const Header = ({ accountId, region, setAccountId, setSelectedRegion }) => {
  const changeAccount = event => {
    // Resets the credentials
    axios.put(`${BASE_URL}/session`);
    setAccountId('');
  };

  const changeRegion = event => {
    console.log(event);
    axios.put(`${BASE_URL}/region/${event.target.value}`);
    setSelectedRegion(event.target.value);
  };

  return (
    <div id='header'>
      <h1 id='app-title'>Inventori</h1>
      {accountId ? (
        <>
          <div id='account-information'>
            <InputLabel id='account-heading' onClick={changeAccount}>
              Change Account
            </InputLabel>
            <br />
            <label id='account-value-label'>{accountId}</label>
          </div>
          <div id='region-information'>
            <InputLabel id='region-heading'>Change Region</InputLabel>
            <Select
              labelId='region-value'
              value={region}
              label='Change region'
              onChange={changeRegion}
            >
              <MenuItem value={'eu-west-1'}>eu-west-1</MenuItem>
              <MenuItem value={'eu-central-1'}>eu-central-1</MenuItem>
              <MenuItem value={'us-east-1'}>us-east-1</MenuItem>
            </Select>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Header;
