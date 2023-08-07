import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vpc from '../../aws/network/vpc/vpc';

function InventoriScreen() {
  const [vpcs, setVpcs] = useState([]);

  useEffect(getEc2Instances => {
    axios.get('http://localhost:3010/network/vpc').then(res => {
      setVpcs(res.data.body);
    });
  }, []);

  return (
    <div>
      {vpcs.map(vpc => {
        return <Vpc key={vpc.VpcId} vpc={vpc} />;
      })}
    </div>
  );
}

export default InventoriScreen;