import './vpc.css';
import React, { useEffect, useState } from 'react';
import AvailabilityZone from '../availability-zone/availability-zone';
import Resource from '../resource-component/resource-component';
function Vpc({
  vpc,
  subnets,
  routeTables,
  internetGateways,
  natGateways,
  ec2Instances,
  ecsInstances,
  rdsInstances,
}) {
  const getVpcName = () => {
    let vpcName = vpc.VpcId;
    vpc.Tags.forEach(tag => {
      if (tag.Key === 'Name') {
        vpcName = tag.Value;
      }
    });
    return vpcName;
  };

  const getInternetGatewayName = ig => {
    let iGName = ig.InternetGatewayId;
    ig.Tags.forEach(tag => {
      if (tag.Key === 'Name') {
        iGName = tag.Value;
      }
    });
    return iGName;
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
      <div className='internet-gateways-container'>
        {internetGateways.map(internetGateway => {
          const vpcIds = [];
          for (const attachment of internetGateway.Attachments) {
            vpcIds.push(attachment.VpcId);
          }
          if (vpcIds.includes(vpc.VpcId)) {
            return (
              <Resource
                key={internetGateway.InternetGatewayId}
                resourceType={getInternetGatewayName(internetGateway)}
                imageName='internetGatewayLogo'
              />
            );
          }
          return null;
        })}
      </div>
      <div className='availability-zones'>
        {vpc.AvailabilityZones.map(az => {
          return (
            <AvailabilityZone
              key={az}
              zone={az}
              subnets={subnets}
              routeTables={routeTables}
              natGateways={natGateways}
              ec2Instances={ec2Instances}
              ecsInstances={ecsInstances}
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
