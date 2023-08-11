import './vpc.css';
import React from 'react';
import Subnet from '../subnet/subnet';

function Vpc({ vpc }) {
  let vpcName = null;
  vpc.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      vpcName = tag.Value;
    }
  });

  return (
    <>
      <div id='vpc'>
        <h2>{vpcName}</h2>
        {vpc.subnets.map(subnet => (
          <Subnet key={subnet.SubnetId} subnet={subnet} />
        ))}
      </div>
    </>
  );
}

export default Vpc;
