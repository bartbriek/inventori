import React from 'react';
import axios from 'axios';
import './menu.css';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { InputLabel, MenuItem, Paper } from '@mui/material';

function SelectionComponent({
  handleSelectChange,
  setRegionFlag,
  accountId,
  region,
}) {
  // Button
  const handleRegionButtonClick = async () => {
    try {
      await axios.put(`http://localhost:3010/regions/${region}`);
      setRegionFlag(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper id='selection-component'>
      <h1>Inventori</h1>
      <div>
        <InputLabel id='account'>{accountId}</InputLabel>
        <br />
      </div>
      <div>
        <br />
        <InputLabel id='regions'>Regions</InputLabel>
        <br />
        <Select
          labelId='regions'
          value={'-'}
          name='regions'
          id='regions'
          onChange={handleSelectChange}
        >
          <MenuItem value='-'>Choose a region</MenuItem>
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
        Visualize resources
      </Button>
    </Paper>
  );
}

export default SelectionComponent;
