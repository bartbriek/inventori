import './credential-screen.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { BASE_URL } from '../../baseConfig';

function CredentialScreen({ setAccountId }) {
  const [keys, setKeys] = useState({
    accessKey: '',
    secretKey: '',
    sessionToken: '',
  });

  const handleClick = async event => {
    event.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/credentials`,
        {
          access_key: keys.accessKey,
          secret_key: keys.secretKey,
          session_token: keys.sessionToken,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      // Authorization is now performed and user will see the application.

      const accountId = await axios.get(`${BASE_URL}/accounts`);
      setAccountId(accountId.data.body.account_id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = event => {
    const { value, id } = event.target;

    setKeys(prevValue => {
      console.log('here');
      if (id === 'input-access-key') {
        return {
          accessKey: value,
          secretKey: prevValue.secretKey,
          sessionToken: prevValue.sessionToken,
        };
      } else if (id === 'input-secret-key') {
        return {
          accessKey: prevValue.accessKey,
          secretKey: value,
          sessionToken: prevValue.sessionToken,
        };
      } else if (id === 'input-session-token') {
        return {
          accessKey: prevValue.accessKey,
          secretKey: prevValue.secretKey,
          sessionToken: value,
        };
      }
    });
  };

  return (
    <div>
      <Box id='box-credential-screen'>
        <form id='credential-screen' onSubmit={handleClick}>
          <TextField
            id='input-access-key'
            label='Access Key'
            variant='standard'
            onChange={handleChange}
            value={keys.accessKey}
            multiline
            required
            maxRows={5}
            fullWidth
          />

          <br />

          <TextField
            id='input-secret-key'
            label='Secret Key'
            variant='standard'
            onChange={handleChange}
            value={keys.secretKey}
            multiline
            required
            maxRows={5}
            fullWidth
          />

          <br />

          <TextField
            id='input-session-token'
            label='Session Token'
            variant='standard'
            onChange={handleChange}
            value={keys.sessionToken}
            multiline
            required
            maxRows={5}
            fullWidth
          />

          <br />

          <Button
            id='credentials-submit-button'
            variant='contained'
            type='submit'
          >
            Submit credentials
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default CredentialScreen;
