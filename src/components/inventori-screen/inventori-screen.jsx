import './inventori-screen.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourcesScreen from './resources-screen/resources-screen';
import Header from './header/header';
import { BASE_URL } from '../../baseConfig';

function InventoriScreen() {
  const [accountId, setAccountId] = useState('');
  const [region, setSelectedRegion] = useState('eu-west-1');
  const [regionFlag, setRegionFlag] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/accounts`)
      .then(response => {
        setAccountId(response.data.body.account_id);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container'>
      <Header accountId={accountId} region={region} />
      <ResourcesScreen />
    </div>
  );
}

export default InventoriScreen;
