import React from 'react';

function Ec2Instance({ instance }) {
  return <div id='ec2-instance'>{instance.InstanceId}</div>;
}

export default Ec2Instance;
