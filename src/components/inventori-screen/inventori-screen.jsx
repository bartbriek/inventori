import './inventori-screen.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourcesScreen from './resources-screen/resources-screen';
import CredentialScreen from '../credential-screen/credential-screen';
import Header from './header/header';
import { BASE_URL } from '../../baseConfig';

function InventoriScreen() {
  const [accountId, setAccountId] = useState('');
  const [region, setSelectedRegion] = useState('eu-west-1');

  useEffect(() => {
    axios
      .get(`${BASE_URL}/accounts`)
      .then(response => {
        setAccountId(response.data.body.account_id);
      })
      .catch(err => {
        console.log(err);
      });
  }, [region]);

  return (
    <div className='container'>
      <Header
        accountId={accountId}
        region={region}
        setAccountId={setAccountId}
        setSelectedRegion={setSelectedRegion}
      />
      {accountId && region ? (
        <ResourcesScreen region={region} />
      ) : (
        <CredentialScreen setAccountId={setAccountId} />
      )}
    </div>
  );
}

export default InventoriScreen;
