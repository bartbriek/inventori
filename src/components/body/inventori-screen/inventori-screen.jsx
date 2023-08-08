import React, { useState } from 'react';
import axios from 'axios';
import Vpc from '../../aws/network/vpc/vpc';

function InventoriScreen({ accountId, region }) {
  const [vpcs, setVpcs] = useState([]);
  const [subnets, setSubnets] = useState([]);

  function listNetworkResources() {
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
        {vpcs.map(vpc => {
          return (
            <Vpc
              accountId={accountId}
              region={region}
              key={vpc.VpcId}
              vpc={vpc}
            />
          );
        })}
      </div>
      <button onClick={listNetworkResources}>List network resources</button>
    </div>
  );
}

export default InventoriScreen;
