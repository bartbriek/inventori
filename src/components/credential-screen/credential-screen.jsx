import './credential-screen.css';
import React, { useState } from 'react';
import axios from 'axios';

function CredentialScreen({ setAuthorization }) {
  const [keys, setKeys] = useState({
    accessKey: '',
    secretKey: '',
    sessionToken: '',
  });

  const handleClick = async event => {
    event.preventDefault();
    try {
      await axios.post(
        'http://localhost:3010/credentials',
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
      setAuthorization(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setKeys(prevValue => {
      if (name === 'accessKey') {
        return {
          accessKey: value,
          secretKey: prevValue.secretKey,
          sessionToken: prevValue.sessionToken,
        };
      } else if (name === 'secretKey') {
        return {
          accessKey: prevValue.accessKey,
          secretKey: value,
          sessionToken: prevValue.sessionToken,
        };
      } else if (name === 'sessionToken') {
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
      <form id="credential-screen" onSubmit={handleClick}>
        <input
          className='input'
          name='accessKey'
          placeholder='Access Key'
          onChange={handleChange}
          type='text'
          value={keys.accessKey}
        />

        <br />

        <input
          className='input'
          name='secretKey'
          placeholder='Secret Key'
          onChange={handleChange}
          type='text'
          value={keys.secretKey}
        />

        <br />

        <input
          className='input'
          name='sessionToken'
          placeholder='Session Token'
          onChange={handleChange}
          type='text'
          value={keys.sessionToken}
        />

        <br />

        <button type='submit'>Submit credentials</button>
      </form>
    </div>
  );
}

export default CredentialScreen;
