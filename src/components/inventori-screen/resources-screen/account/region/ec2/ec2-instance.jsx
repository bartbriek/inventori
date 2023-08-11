import React from 'react';
import './ec2-instance.css';

function Ec2Instance({ instance }) {
  let instanceName = null;
  instance.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      instanceName = tag.Value;
    }
  });

  return (
    <div id='ec2-instance'>
      {instanceName}
      {instance.InstanceId}
    </div>
  );
}

export default Ec2Instance;
