import './vpc.css';
import React from 'react';
import Subnet from '../subnet/subnet';

function Vpc({ vpc }) {
  const subnets = vpc.Subnets;
  const ec2Instances = [];

  subnets.forEach(subnet => {
    ec2Instances.push(subnet.Ec2Instances);
  });

  return (
    <>
      <div id='vpc'>
        {vpc.VpcId}
        {vpc.CidrBlock}
        {subnets.map(subnet => {
          return (
            <Subnet
              key={subnet.SubnetId}
              subnet={subnet}
              instances={ec2Instances}
            />
          );
        })}
      </div>
    </>
  );
}

export default Vpc;
