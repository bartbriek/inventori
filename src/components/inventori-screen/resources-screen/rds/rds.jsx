import React, { useState } from 'react';
import './rds.css';
import { Popover } from '@mui/material';

function Rds({ instance }) {
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
      className='service'
      onMouseOver={handlePopoverOpen}
      onMouseOut={handlePopoverClose}
    >
      <img
        className='service-logo'
        src='https://logowik.com/content/uploads/images/aws-rds2214.logowik.com.webp'
        alt='RDS instance logo'
      />
      <div className='service-title'>{instance.DBIdentifier}</div>
      <Popover
        id='dyanmodb-table-details'
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
            {instance.DBIdentifier}
          </p>
          <p>
            <strong>Cluster Name: </strong>
            <br />
            {instance.DBClusterIdentifier}
          </p>
          <p>
            <strong>Endpoint: </strong>
            <br />
            {instance.Endpoint.Address}
          </p>
          <p>
            <strong>Port: </strong>
            <br />
            {instance.Endpoint.Port}
          </p>
          <p>
            <strong>Engine: </strong>
            <br />
            {instance.Engine}
          </p>
          <p>
            <strong>Engine version: </strong>
            <br />
            {instance.EngineVersion}
          </p>
          <p>
            <strong>Master username: </strong>
            <br />
            {instance.MasterUsername}
          </p>
        </div>
      </Popover>
    </div>
  );
}

// DBIdentifier: rdsInstance.DBInstanceIdentifier,
//   DBClusterIdentifier: rdsInstance.DBClusterIdentifier,
//   DBSubnetGroupName: rdsInstance.DBSubnetGroup.DBSubnetGroupName,
//   DBSubnetIds: subnetIds,
//   DBSubnetGroup: rdsInstance.DBSubnetGroup,
//   Endpoint: rdsInstance.Endpoint,
//   Engine: rdsInstance.Engine,
//   EngineVersion: rdsInstance.EngineVersion,
//   AvailabilityZone: rdsInstance.AvailabilityZone,
//   Tags: rdsInstance.Tags,
//   MasterUsername: rdsInstance.MasterUsername,

export default Rds;
