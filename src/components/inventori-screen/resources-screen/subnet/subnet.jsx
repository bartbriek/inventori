import './subnet.css';
import React from 'react';
import Resource from '../resource-component/resource-component';

function Subnet({ subnet, subnetType, ec2Instances, rdsInstances }) {
  const getSubnetName = () => {
    let subnetName = subnet.subnetId;
    subnet.tags.forEach(tag => {
      if (tag.Key === 'Name') {
        subnetName = tag.Value;
        return;
      }
    });
    return subnetName;
  };

  const getInstanceName = instance => {
    let instanceName = instance.InstanceId;
    instance.Tags.forEach(tag => {
      if (tag.Key === 'Name') {
        instanceName = tag.Value;
        return;
      }
    });
    return instanceName;
  };

  return (
    <div className={`${subnetType} subnet`}>
      <strong>{subnetType.split('-')[0]}</strong>
      {getSubnetName()}
      <div>
        {ec2Instances.map(instance => {
          if (instance.SubnetId === subnet.subnetId) {
            return (
              <Resource
                key={instance.InstanceId}
                resourceType={getInstanceName(instance)}
                imageName='ec2InstanceLogo'
              />
            );
          }
        })}
      </div>
      <div>
        {rdsInstances.map(rdsInstance => {
          if (rdsInstance.SubnetIds.includes(subnet.subnetId)) {
            return (
              <Resource
                key={rdsInstance.DBInstanceIdentifier}
                resourceType={rdsInstance.DBInstanceIdentifier}
                imageName='rdsInstanceLogo'
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Subnet;
