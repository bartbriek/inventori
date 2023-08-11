import './subnet.css';
import React from 'react';
import Ec2Instance from '../ec2/ec2-instance';

function Subnet({ subnet }) {
  let subnetName = null;
  subnet.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      subnetName = tag.Value;
    }
  });

  return (
    <div id='subnet'>
      <div>
        <h3>{subnetName}</h3>
      </div>
      <div>
        {subnet.instances.map(instance => (
          <Ec2Instance key={instance.InstanceId} instance={instance} />
        ))}
      </div>
    </div>
  );
}

export default Subnet;
