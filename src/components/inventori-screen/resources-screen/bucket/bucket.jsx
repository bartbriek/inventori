import React, { useState } from 'react';
import './bucket.css';
import { Popover } from '@mui/material';

function Bucket({ bucket }) {
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
        src='https://res.cloudinary.com/practicaldev/image/fetch/s--o9jchbR7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://day-journal.com/memo/images/logo/aws/s3.png'
        alt='S3 Bucket logo'
      />

      <div className='service-title'>S3 Bucket</div>
      <Popover
        id='lambda-function-details'
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
            {bucket.Name}
          </p>
        </div>
      </Popover>
    </div>
  );
}

export default Bucket;
