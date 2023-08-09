import React from 'react';
import './ec2-instance.css';
import { Paper } from '@mui/material';

function Ec2Instance({ instance }) {
  let instanceName = null;
  instance.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      instanceName = tag.Value;
    }
  });

  return (
    <Paper id='ec2-instance'>
      {instanceName}
      {instance.InstanceId}
    </Paper>
  );
}

export default Ec2Instance;
