import React, { useEffect, useState } from 'react';
import './availability-zone.css';
import Subnet from '../subnet/subnet';

function AvailabilityZone({
  zone,
  vpcId,
  subnets,
  natGateways,
  routeTables,
  ec2Instances,
  ecsInstances,
  rdsInstances,
}) {
  const [publicSubnets, setPublicSubnets] = useState([]);
  const [privateSubnets, setPrivateSubnets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const assignSubnets = subnets => {
    const tempPublicSubnets = [];
    const tempPrivateSubnets = [];
    subnets.forEach(subnet => {
      // Loop over all the route tables
      for (const routeTable of routeTables) {
        // Loop over the accociated subnets for this route table to check
        // if we need to perform the public / private check.
        let associatedSubnet = false;
        let isPublic = false;
        for (const routeAccociation of routeTable.Associations) {
          if (subnet.subnetId === routeAccociation.SubnetId) {
            associatedSubnet = true;
            break;
          }
        }

        if (associatedSubnet) {
          for (const route of routeTable.Routes) {
            if (route.GatewayId) {
              if (route.GatewayId.includes('igw')) {
                isPublic = true;
                break;
              }
            }
          }
          if (isPublic) {
            tempPublicSubnets.push(subnet);
            break;
          } else {
            tempPrivateSubnets.push(subnet);
            break;
          }
        }
      }
      setPrivateSubnets(tempPrivateSubnets);
      setPublicSubnets(tempPublicSubnets);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const filteredSubnets = [];
    subnets.forEach(subnet => {
      if (subnet.availabilityZone === zone && subnet.vpcId === vpcId) {
        filteredSubnets.push(subnet);
      }
    });

    // Wait for filteredSubnets to complete and then run the assignSubnets function
    assignSubnets(filteredSubnets);
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Gathering resources</h1>
      ) : (
        <div className='availability-zone'>
          <strong>AZ {zone}</strong>
          <div className='subnets-container'>
            <div className='public-subnets-container'>
              {publicSubnets.map(subnet => {
                return (
                  <Subnet
                    key={subnet.subnetId}
                    subnet={subnet}
                    subnetType='public-subnet'
                    natGateways={natGateways}
                    ec2Instances={ec2Instances}
                    ecsInstances={ecsInstances}
                    rdsInstances={rdsInstances}
                  />
                );
              })}
            </div>
            <div className='private-subnets-container'>
              {privateSubnets.map(subnet => {
                return (
                  <Subnet
                    key={subnet.subnetId}
                    subnet={subnet}
                    subnetType='private-subnet'
                    natGateways={natGateways}
                    ec2Instances={ec2Instances}
                    ecsInstances={ecsInstances}
                    rdsInstances={rdsInstances}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AvailabilityZone;
