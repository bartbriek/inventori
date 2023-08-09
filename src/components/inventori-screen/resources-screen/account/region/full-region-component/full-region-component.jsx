import React from 'react';
import Vpc from '../vpc/vpc';
import { Paper } from '@mui/material';

function FullRegionComponent({ resources }) {
  return (
    <Paper>
      {resources.map(vpc => (
        <Vpc key={vpc.VpcId} vpc={vpc} />
      ))}
    </Paper>
  );
}

export default FullRegionComponent;
