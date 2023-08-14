import React from 'react';
import './availability-zone.css';

function AvailabilityZone({ zone, subnets, ec2Instances }) {
  return <div className='availability-zone'>{zone}</div>;
}

export default AvailabilityZone;
