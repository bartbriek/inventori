import './vpc.css';
import React from 'react';
import Subnet from '../subnet/subnet';
import { Paper } from '@mui/material';

function Vpc({ vpc }) {
  let vpcName = null;
  vpc.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      vpcName = tag.Value;
    }
  });

  return (
    <>
      <Paper id='vpc'>
        <h2>{vpcName}</h2>
        {vpc.subnets.map(subnet => (
          <Subnet key={subnet.SubnetId} subnet={subnet} />
        ))}
      </Paper>
    </>
  );
}

export default Vpc;
