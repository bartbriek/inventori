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
      <label className='service-title'>{resourceType}</label>
    </div>
  );
};

export default ResourceComponent;
