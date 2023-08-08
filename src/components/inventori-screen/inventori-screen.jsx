import React, { useState } from 'react';
import axios from 'axios';
import Vpc from './resources-screen/account/region/vpc/vpc';
import Menu from './menu/menu';

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
    <div>
      <div>
        <Menu />
      </div>
      <div>
        {vpcs.map(vpc => {
          return (
            <Vpc
              accountId={accountId}
              region={region}
              key={vpc.VpcId}
              vpcId={vpc.VpcId}
            />
          );
        })}
      </div>
      <button onClick={visualizeResources}>Visualize resources</button>
    </div>
  );
}

export default InventoriScreen;
