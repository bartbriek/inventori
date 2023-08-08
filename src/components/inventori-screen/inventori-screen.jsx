import './inventori-screen.css';
import React, { useState } from 'react';
import axios from 'axios';
import Menu from './menu/menu';
import ResourcesScreen from './resources-screen/resources-screen';

function InventoriScreen({ accountId, region }) {
  const [vpcs, setVpcs] = useState([]);
  const [subnets, setSubnets] = useState([]);

  function visualizeResources() {
    axios.get('http://localhost:3010/network/vpcs').then(res => {
      setVpcs(res.data.body);
    });

    axios.get('http://localhost:3010/network/subnets').then(res => {
      setSubnets(res.data.body);
    });
  }

  return (
    <div className='container'>
      <div className='menu-section'>
        <Menu />
      </div>
      <div className='vertical-line'></div>
      <div className='resources-section'>
        <h1>Resources section</h1>
        <ResourcesScreen />
      </div>
    </div>
  );
}

export default InventoriScreen;
