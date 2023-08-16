import './vpc.css';
import React from 'react';
import AvailabilityZone from '../availability-zone/availability-zone';

function Vpc({ vpc, subnets, routeTables, ec2Instances, rdsInstances }) {
  const getVpcName = () => {
    let vpcName = vpc.VpcId;
    vpc.Tags.forEach(tag => {
      if (tag.Key === 'Name') {
        vpcName = tag.Value;
      }
    });
    return vpcName;
  };

  return (
    <div className='vpc'>
      <div>
        <label>
          <strong>VPC {getVpcName()}</strong>
        </label>
        <br />
        {vpc.CidrBlock}
      </div>
      <div className='availability-zones'>
        {vpc.AvailabilityZones.map(az => {
          return (
            <AvailabilityZone
              key={az}
              zone={az}
              subnets={subnets}
              routeTables={routeTables}
              ec2Instances={ec2Instances}
              rdsInstances={rdsInstances}
              vpcId={vpc.VpcId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Vpc;
