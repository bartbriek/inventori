import './CredentialScreen.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CredentialScreen() {
  const [hasCredentials, setCredentials] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3010/session')
      .then(() => {
        setCredentials(true);
      })
      .catch(err => {
        console.log(err);
        setCredentials(false);
      });
  });

  const [keys, setKeys] = useState({
    accessKey: '',
    secretKey: '',
    sessionToken: '',
  });

  const handleClick = event => {
    event.preventDefault();

    axios
      .post(
        'http://localhost:3010/credentials',
        {
          accessKey: keys.accessKey,
          secretKey: keys.secretKey,
          sessionToken: keys.sessionToken,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .then(() => {
        setCredentials(prev => !prev);
      })
      .catch(err => {
        console.log(err);
      });
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

  const showInputForm = () => {
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
  };

  const Vpcs = () => {
    const [vpcs, setVpcs] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3010/network/vpc').then(res => {
        console.log(res);
        setVpcs(res.data.body);
      });
    }, []);

    return (
      <div>
        Vpcs
        {vpcs.map((item, i) => {
          return (
            <div key={i}>
              <p id='vpc'>{item?.VpcId}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='credentials-container'>
      {hasCredentials ? <Vpcs /> : showInputForm()}
    </div>
  );
}

export default CredentialScreen;
