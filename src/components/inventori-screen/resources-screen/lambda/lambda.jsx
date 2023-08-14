import React, { useState } from 'react';
import './lambda.css';
import { Popover } from '@mui/material';

function Lambda({ lambdaFunction }) {
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
        src='https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg'
        alt='Lambda function logo'
      />

      <div id='service-title'>{lambdaFunction.FunctionName}</div>
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
            {lambdaFunction.FunctionName}{' '}
          </p>
          <p>
            <strong>ARN: </strong>
            <br />
            {lambdaFunction.FunctionArn}
          </p>
          <p>
            <strong>Runtime: </strong>
            <br />
            {lambdaFunction.Runtime}
          </p>
        </div>
      </Popover>
    </div>
  );
}

export default Lambda;

// <div>
//   {showDetails ? (
//     <p id='lambda-function-name'>{lambdaFunction.FunctionName}</p>
//   ) : null}
// </div>
