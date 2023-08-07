import React, { useState } from 'react';
import axios from 'axios';
import Vpc from '../../aws/network/vpc/vpc';
import Account from '../../aws/governance/account/account';

function InventoriScreen({ accountId, region }) {
  const [vpcs, setVpcs] = useState([]);

  function listNetworkResources() {
    axios.get('http://localhost:3010/network/vpc').then(res => {
      setVpcs(res.data.body);
    });
  }

  return (
    <div>
      <div>
        <Account />
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
