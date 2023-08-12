import './subnet.css';
import React from 'react';
import Ec2Instance from '../ec2/ec2-instance';
import Rds from '../rds/rds';
import { Paper } from '@mui/material';

function Subnet({ subnet }) {
  return (
    <Paper id='subnet'>
      <strong>{subnet.SubnetName}</strong>
      <div>
        {subnet.Ec2Instances.map(ec2Instance => {
          let instance = <></>;
          if (ec2Instance.InstanceId) {
            instance = (
              <Ec2Instance
                key={ec2Instance.InstanceId}
                instance={ec2Instance}
              />
            );
          }
          return instance;
        })}
      </div>
      <div>
        {subnet.RdsInstances.map(rdsInstance => {
          return (
            <Rds
              key={rdsInstance.DBInstanceIdentifier}
              instance={rdsInstance}
            />
          );
        })}
      </div>
    </Paper>
  );
}

export default Subnet;
