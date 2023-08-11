import React from 'react';
import Vpc from '../vpc/vpc';

function FullRegionComponent({ resources }) {
  console.log(resources);
  return (
    <div>
      {resources.map(vpc => (
        <Vpc key={vpc.VpcId} vpc={vpc} />
      ))}
    </div>
  );
}

export default FullRegionComponent;
