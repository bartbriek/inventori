import './CredentialScreen.css';
import React, { useState } from 'react';

function CredentialScreen() {
  const [keys, setKeys] = useState({
    accessKey: '',
    secretKey: '',
  });

  function handleClick(event) {
    // TODO: Make request to backend to store credentials in DB.

    event.preventDefault();
  }

  function handleChange(event) {
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
  }

  return (
    <div className='credentials-container'>
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

        <br />

        <button>Submit credentials</button>
      </form>
    </div>
  );
}

export default CredentialScreen;
