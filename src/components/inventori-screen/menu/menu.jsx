import React, { useState } from 'react';
import axios from 'axios';
import './menu.css';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { Alert, InputLabel, MenuItem, Snackbar } from '@mui/material';

function SelectionComponent({
  handleSelectChange,
  setRegionFlag,
  accountId,
  region,
}) {
  const [snackbarEnabled, setSnackbarEnabled] = useState(false);

  // Button
  const handleRegionButtonClick = async () => {
    try {
      await axios.put(`http://localhost:3010/regions/${region}`);
      setRegionFlag(true);
      setSnackbarEnabled(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarEnabled(false);
  };

  return (
    <div id='selection-component'>
      <h1>Inventori</h1>
      <div>
        <InputLabel id='account-heading'>
          <strong>Account Id</strong>
        </InputLabel>
        <InputLabel id='account-label'>{accountId}</InputLabel>
        <br />
      </div>
      <div>
        <br />
        <InputLabel id='region-heading'>
          <strong>Regions</strong>
        </InputLabel>

        <Select
          labelId='regions-select'
          id='regions-select'
          value={region}
          name='regions'
          label='Region'
          onChange={handleSelectChange}
        >
          <MenuItem value='us-east-1'>us-east-1</MenuItem>
          <MenuItem value='eu-west-1'>eu-west-1</MenuItem>
          <MenuItem value='eu-central-1'>eu-central-1</MenuItem>
        </Select>
        <br />
      </div>
      <Button
        id='inventori-button'
        variant='contained'
        onClick={handleRegionButtonClick}
      >
        Visualize
      </Button>
      <Snackbar
        open={snackbarEnabled}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message='Start visualizing resources'
        // action={action}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SelectionComponent;
