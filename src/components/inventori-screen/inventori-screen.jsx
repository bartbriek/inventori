import './inventori-screen.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './menu/menu';
import ResourcesScreen from './resources-screen/resources-screen';

function InventoriScreen() {
  const [accountId, setAccountId] = useState('');
  const [region, setSelectedRegion] = useState('');
  const [regionFlag, setRegionFlag] = useState(false);

  // Region Selection
  const handleSelectChange = async event => {
    setSelectedRegion(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:3010/accounts').then(
      response => {
        setAccountId(response.data.body.account_id);
      },
      [accountId],
    );
  });

  return (
    <div className='container'>
      <div className='menu-section'>
        <Menu accountId={accountId} region={region} handleSelectChange={handleSelectChange} setRegionFlag={setRegionFlag}/>
      </div>
      <div className='resources-section'>
        {regionFlag ? <ResourcesScreen accountId={accountId} region={region}/> : null}
      </div>
    </div>
  );
}

export default InventoriScreen;
