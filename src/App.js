import './App.css';
import CredentialScreen from './components/body/CredentialScreen/CredentialScreen';
import Footer from './components/footer/Footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InventoriScreen from './components/body/InventoriScreen/InventoriScreen';

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
        setAuthorization(false);
      });
  });

  return (
    <div className='App'>
      <h1>Inventori</h1>
      {isAuthorized ? (
        <InventoriScreen />
      ) : (
        <CredentialScreen setAuthorization={setAuthorization} />
      )}
      <Footer />
    </div>
  );
}

export default App;
