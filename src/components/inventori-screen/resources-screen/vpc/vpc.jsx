import './vpc.css';
import React from 'react';
import Subnet from '../subnet/subnet';

function Vpc({ vpc }) {
  const subnets = vpc.Subnets.sort();
  const ec2Instances = [];

  const getVpcName = () => {
    let vpcName = '';
    vpc.Tags.forEach(tag => {
      if (tag.Key === 'Name') {
        vpcName = tag.Value;
      } else {
        vpcName = vpc.VpcId;
      }
    });
    return vpcName;
  };

  subnets.forEach(subnet => {
    ec2Instances.push(subnet.Ec2Instances);
  });

  return (
    <div className='vpc'>
      <div>
        <img
          className='services-logo'
          src='https://logowik.com/content/uploads/images/aws-vpc2188.logowik.com.webp'
          alt='AWS VPC logo'
        />
        <strong>VPC {getVpcName()}</strong>
      </div>
      {vpc.CidrBlock}
      <div className='subnets-container'>
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
    </div>
  );
}

export default Vpc;
