import './header.css';
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../baseConfig';
import { MenuItem, Button, Menu, Typography } from '@mui/material';

const Header = ({ accountId, setAccountId, setSelectedRegion }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeAccount = event => {
    // Resets the credentials
    axios.put(`${BASE_URL}/session`);
    setAccountId('');
  };

  const changeRegion = event => {
    setAnchorEl(null);
    axios.put(`${BASE_URL}/region/${event.target.innerText}`);
    setSelectedRegion(event.target.innerText);
  };

  return (
    <div id='header'>
      <h1 id='app-title'>Inventori</h1>
      {accountId ? (
        <>
          <div id='account-information'>
            <Typography id='account-value-label'>{accountId}</Typography>
          </div>
          <div id='change-account-information'>
            <Button
              id='change-account-button'
              variant='outlined'
              onClick={changeAccount}
              style={{ color: 'black', borderColor: 'black' }}
            >
              Change Account
            </Button>
          </div>
          <div id='region-information'>
            <Button
              id='change-region-button'
              variant='outlined'
              onClick={handleClick}
              style={{ color: 'black', borderColor: 'black' }}
            >
              Change Region
            </Button>
            <Menu
              id='region-value'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={changeRegion}>us-east-1</MenuItem>
              <MenuItem onClick={changeRegion}>us-east-2</MenuItem>
              <MenuItem onClick={changeRegion}>us-west-1</MenuItem>
              <MenuItem onClick={changeRegion}>us-west-2</MenuItem>
              <MenuItem onClick={changeRegion}>ap-south-1</MenuItem>
              <MenuItem onClick={changeRegion}>ap-northeast-1</MenuItem>
              <MenuItem onClick={changeRegion}>ap-northeast-2</MenuItem>
              <MenuItem onClick={changeRegion}>ap-northeast-3</MenuItem>
              <MenuItem onClick={changeRegion}>ap-southeast-1</MenuItem>
              <MenuItem onClick={changeRegion}>ap-southeast-2</MenuItem>
              <MenuItem onClick={changeRegion}>ca-central-1</MenuItem>
              <MenuItem onClick={changeRegion}>eu-central-1</MenuItem>
              <MenuItem onClick={changeRegion}>eu-west-1</MenuItem>
              <MenuItem onClick={changeRegion}>eu-west-2</MenuItem>
              <MenuItem onClick={changeRegion}>eu-west-3</MenuItem>
              <MenuItem onClick={changeRegion}>eu-north-1</MenuItem>
              <MenuItem onClick={changeRegion}>sa-east-1</MenuItem>
              <MenuItem onClick={changeRegion}>af-south-1</MenuItem>
              <MenuItem onClick={changeRegion}>ap-east-1</MenuItem>
              <MenuItem onClick={changeRegion}>ap-south-2</MenuItem>
              <MenuItem onClick={changeRegion}>ap-southeast-3</MenuItem>
              <MenuItem onClick={changeRegion}>ap-southeast-4</MenuItem>
              <MenuItem onClick={changeRegion}>ap-southeast-4</MenuItem>
              <MenuItem onClick={changeRegion}>eu-south-1</MenuItem>
              <MenuItem onClick={changeRegion}>eu-south-2</MenuItem>
              <MenuItem onClick={changeRegion}>eu-central-1</MenuItem>
              <MenuItem onClick={changeRegion}>eu-central-2</MenuItem>
              <MenuItem onClick={changeRegion}>me-south-1</MenuItem>
              <MenuItem onClick={changeRegion}>me-central-1</MenuItem>
              <MenuItem onClick={changeRegion}>il-central-1</MenuItem>
            </Menu>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Header;
