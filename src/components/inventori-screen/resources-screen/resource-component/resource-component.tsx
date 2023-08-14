import './resource-component.css';
import React from 'react';
import IResource from '../../../../../libs/interfaces/resource-component';

const ResourceComponent: React.FC<IResource> = ({ resourceType, imageSrc }) => {
  return (
    <div className='service'>
      <img className='services-logo' src={imageSrc} alt='ECS image logo' />
      <div className='service-title'>{resourceType}</div>
    </div>
  );
};

export default ResourceComponent;
