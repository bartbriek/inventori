import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CredentialScreen from './components/credential-screen/credential-screen';
import InventoriScreen from './components/inventori-screen/inventori-screen';

function App() {
  const [isAuthorized, setAuthorization] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3010/session')
      .then(() => {
        setAuthorization(true);
      })
      .catch(err => {
        console.log(err);
        setAuthorization(false); // Set to true for bypassing credential screen;
      });
  });

  return (
    <div className='App'>
      {isAuthorized ? (
        <div>
          <InventoriScreen />
        </div>
      ) : (
        <CredentialScreen setAuthorization={setAuthorization} />
      )}
    </div>
  );
}

export default App;
