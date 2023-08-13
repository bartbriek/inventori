import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.css';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { Alert, InputLabel, MenuItem, Skeleton, Snackbar } from '@mui/material';

function SelectionComponent({
  handleSelectChange,
  setRegionFlag,
  accountId,
  region,
  setAuthorization,
}) {
  const [snackbarEnabled, setSnackbarEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accountId) {
      setIsLoading(false);
    }
  }, [accountId]);

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

  const handleChangeAccountClick = async () => {
    await axios.put('http://localhost:3010/session');
    setAuthorization(false);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton variant='rounded' width={260} height={500} />
      ) : (
        <div id='menu'>
          <h1 id='app-name'>Inventori</h1>
          <div>
            <InputLabel id='account-heading'>
              <strong>Account Id</strong>
            </InputLabel>
            <InputLabel id='account-label'>{accountId}</InputLabel>
            <br />
            <Button
              id='change-account-button'
              variant='contained'
              onClick={handleChangeAccountClick}
            >
              Change Account
            </Button>
            <Snackbar
              open={snackbarEnabled}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity='success'
                sx={{ width: '100%' }}
              >
                Cleared credentials successfully!
              </Alert>
            </Snackbar>
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
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Started visualization...
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}

export default SelectionComponent;
