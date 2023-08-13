import './inventori-screen.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './menu/menu';
import ResourcesScreen from './resources-screen/resources-screen';

function InventoriScreen({ setAuthorization }) {
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
    <div className='container'>
      <Menu
        accountId={accountId}
        region={region}
        handleSelectChange={handleSelectChange}
        setRegionFlag={setRegionFlag}
        setAuthorization={setAuthorization}
      />
      <div className='resources-container'>
        {regionFlag ? <ResourcesScreen /> : null}
      </div>
    </div>
  );
}

export default InventoriScreen;
