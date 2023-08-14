import './subnet.css';
import React, { useState } from 'react';
import Ec2Instance from '../ec2/ec2-instance';
import Rds from '../rds/rds';
import { Popover } from '@mui/material';

function Subnet({ subnet }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div
      id='subnet-name'
      onMouseOver={handlePopoverOpen}
      onMouseOut={handlePopoverClose}
    >
      {subnet.SubnetName}
      <div className={`subnet-container ${subnet.SubnetType}`}>
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
        <Popover
          id='subnet-details'
          sx={{
            pointerEvents: 'none',
            fontSize: '8px',
            padding: 20,
            boxShadow: 1,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div>
            <p>
              <strong>Name: </strong>
              <br />
              {subnet.SubnetName}
            </p>
            <p>
              <strong>Subnet Id </strong>
              <br />
              {subnet.SubnetId}
            </p>
            <p>
              <strong>CIDR Block: </strong>
              <br />
              {subnet.CidrBlock}
            </p>
          </div>
        </Popover>
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
      </div>
    </div>
  );
}

export default Subnet;
