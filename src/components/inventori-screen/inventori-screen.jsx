import './inventori-screen.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './menu/menu';
import ResourcesScreen from './resources-screen/resources-screen';
import { Box } from '@mui/material';

function InventoriScreen() {
  const [accountId, setAccountId] = useState('');
  const [region, setSelectedRegion] = useState('eu-west-1');
  const [regionFlag, setRegionFlag] = useState(false);

  // Region Selection
  const handleSelectChange = async event => {
    setSelectedRegion(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:3010/accounts').then(response => {
      setAccountId(response.data.body.account_id);
    });
  }, []);

  return (
    <>
      <Box id='menu-box'>
        <Menu
          accountId={accountId}
          region={region}
          handleSelectChange={handleSelectChange}
          setRegionFlag={setRegionFlag}
        />
      </Box>
      <Box id='resources-box'>{regionFlag ? <ResourcesScreen /> : null}</Box>
    </>
  );
}

export default InventoriScreen;
