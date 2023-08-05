import './CredentialScreen.css';
import React, { useState } from 'react';

function CredentialScreen() {
  const [hasCredentials, setCredentials] = useState(false);
  const [keys, setKeys] = useState({
    accessKey: '',
    secretKey: '',
  });

  const showCredentials = () => {
    setCredentials(prev => !prev);
  };

  const handleClick = event => {
    showCredentials();

    // TODO: Make request to backend to store credentials in DB.
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setKeys(prevValue => {
      if (name === 'accessKey') {
        return {
          accessKey: value,
          secretKey: prevValue.secretKey,
        };
      } else if (name === 'secretKey') {
        return {
          accessKey: prevValue.accessKey,
          secretKey: value,
        };
      }
    });
  };

  const inputForm = () => {
    return (
      <div>
        <form onSubmit={handleClick}>
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
        </form>

        <button onClick={handleClick}>Submit credentials</button>
      </div>
    );
  };

  const credentials = () => {
    return (
      <div>
        <h3>Access Key ID: {keys.accessKey}</h3>
        <h3>Secret key ID: {keys.secretKey}</h3>
      </div>
    );
  };

  return (
    <div className='credentials-container'>
      {hasCredentials ? credentials() : inputForm()}
    </div>
  );
}

export default CredentialScreen;
