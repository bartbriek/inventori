import React from 'react';
import './ec2-instance.css';

function Ec2Instance({ instance }) {
  return <div id='ec2-instance'>{instance.InstanceId}</div>;
}

export default Ec2Instance;
