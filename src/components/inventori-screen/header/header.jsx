import './header.css';
import React from 'react';

const Header = ({ accountId, region }) => {
  return (
    <div id='header'>
      <h1 id='app-title'>Inventori</h1>
      <div id='account-information'>
        <label id='account-heading'>
          <strong>Current Account</strong>
        </label>
        <br />
        <label id='account-value-label'>{accountId}</label>
      </div>
      <div id='region-information'>
        <label id='region-heading'>
          <strong>Current Region</strong>
        </label>
        <br />
        <label id='region-value-label'>{region}</label>
      </div>
    </div>
  );
};

export default Header;
