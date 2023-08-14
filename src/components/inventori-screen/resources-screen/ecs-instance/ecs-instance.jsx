import React, { useState } from 'react';
import { Popover } from '@mui/material';

function EcsInstance({ instance }) {
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
        className='services-logo'
        src='https://www.logicata.com/wp-content/uploads/2020/04/AWS-Fargate_light-bg@4x.png'
        alt='ECS image logo'
      />
      <div className='service-title'>ECS instance</div>
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
            {instance.taskName}
          </p>
          <p>
            <strong>ClusterName: </strong>
            <br />
            {instance.ecsClusterName}
          </p>
          <p>
            <strong>SubnetId: </strong>
            <br />
            {instance.subnetId}
          </p>
          <p>
            <strong>Instance CPU: </strong>
            <br />
            {instance.cpu}
          </p>
          <p>
            <strong>Task ARN: </strong>
            <br />
            {instance.taskArn}
          </p>
        </div>
      </Popover>
    </div>
  );
}

export default EcsInstance;
