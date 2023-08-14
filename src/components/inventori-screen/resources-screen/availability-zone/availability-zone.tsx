import React from 'react';
import './availability-zone.css';
import ISubnet from '../../../../../libs/interfaces/aws-resources/subnet';
import IEc2Instance from '../../../../../libs/interfaces/aws-resources/ec2-instance';
import IAvailabilityZone from '../../../../../libs/interfaces/aws-resources/availability-zone';

export const AvailabilityZone: React.FC<IAvailabilityZone> = ({
  zoneName,
  subnets,
  ec2Instances,
}) => {
  return <div className='availability-zone'>{zoneName}</div>;
};

export default AvailabilityZone;
