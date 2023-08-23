import './credential-screen.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Box, InputLabel, TextField, Typography } from '@mui/material';
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
      <Box id='box-credential-screen' textAlign='center'>
        <div>
          <Typography id='credential-intro-text'>
            Enter your AWS Credentials here for inventori to make API requests
            on your behalf to the AWS API's to fetch resources running in your
            AWS account.
            <br />
            <br />
            To get your session token:
            <br />
            1. SSO - Sign in to your management console and choose command line
            access.
            <br />
            2. Assume a role that has suffient read access and perform the
            following command in your terminal
            <br />
            <br />
            <span className='code-block'>
              aws sts get-session-token –duration-seconds 129600
            </span>
          </Typography>
          <br />
          <br />
        </div>
        <form id='credential-screen' onSubmit={handleClick}>
          <TextField
            id='input-access-key'
            placeholder='Access Key*'
            variant='standard'
            onChange={handleChange}
            value={keys.accessKey}
            multiline
            required
            maxRows={1}
            fullWidth
          />

          <br />

          <TextField
            id='input-secret-key'
            placeholder='Secret Key*'
            variant='standard'
            onChange={handleChange}
            value={keys.secretKey}
            multiline
            required
            maxRows={1}
            fullWidth
          />

          <br />

          <TextField
            id='input-session-token'
            placeholder='Session Token*'
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
            variant='outlined'
            type='submit'
            style={{
              color: 'black',
              borderColor: 'black',
            }}
          >
            Submit credentials
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default CredentialScreen;
