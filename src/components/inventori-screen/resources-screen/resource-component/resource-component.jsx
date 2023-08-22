import { Typography } from '@mui/material';
import './resource-component.css';
import React from 'react';

const ResourceComponent = ({ resourceType, imageName }) => {
  return (
    <div className='service'>
      <img
        className='services-logo'
        src={`/assets/${imageName}.png`}
        alt='Resource image logo'
      />
      <Typography style={{ fontSize: '8px' }} className='service-title'>
        {resourceType}
      </Typography>
    </div>
  );
};

export default ResourceComponent;
