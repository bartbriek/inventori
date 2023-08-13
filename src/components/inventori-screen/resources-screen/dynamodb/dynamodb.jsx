import React, { useState } from 'react';
import './dynamodb.css';
import { Popover } from '@mui/material';

function Dynamodb({ dynamoDbTable }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        src='https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png'
        alt='DynamoDB logo'
      />

      <div className='service-title'>DynamoDB table</div>
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
            {dynamoDbTable.TableName}
          </p>
          <p>
            <strong>ARN: </strong>
            <br />
            {dynamoDbTable.TableArn}
          </p>
        </div>
      </Popover>
    </div>
  );
}

export default Dynamodb;
