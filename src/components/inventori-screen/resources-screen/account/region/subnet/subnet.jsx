import './subnet.css';
import React from 'react';
import Ec2Instance from '../ec2/ec2-instance';
import { Paper } from '@mui/material';

function Subnet({ subnet }) {
  let subnetName = null;
  subnet.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      subnetName = tag.Value;
    }
  });

  return (
    <Paper id='subnet'>
      <h3>{subnetName}</h3>
      {subnet.instances.map(instance => (
        <Ec2Instance key={instance.InstanceId} instance={instance} />
      ))}
    </Paper>
  );
}

export default Subnet;
