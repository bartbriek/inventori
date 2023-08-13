import React, { useState } from 'react';
import './ec2-instance.css';
import { Popover } from '@mui/material';

function Ec2Instance({ instance }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    // <Paper>
    <div className='service'>
      <img
        className='services-logo'
        src='https://upload.wikimedia.org/wikipedia/commons/b/b9/AWS_Simple_Icons_Compute_Amazon_EC2_Instances.svg'
        alt='EC2 image logo'
        onMouseOver={handlePopoverOpen}
        onMouseOut={handlePopoverClose}
      />
      <div className='service-title'>EC2 instance</div>
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
            {instance.InstanceName}
          </p>
          <p>
            <strong>Image Id: </strong>
            <br />
            {instance.ImageId}
          </p>
          <p>
            <strong>Instance Type: </strong>
            <br />
            {instance.InstanceType}
          </p>
          <p>
            <strong>Architecture: </strong>
            <br />
            {instance.Architecture}
          </p>
        </div>
      </Popover>
    </div>
    // </Paper>
  );
}

export default Ec2Instance;
