import React, { useEffect, useState } from 'react';
import './account.css';
import axios from 'axios';

function Account() {
  const [accountId, setAccountId] = useState('');

  async function getAccountId() {
    try {
      const response = await axios.get('http://localhost:3010/organizations');
      console.log(response);
      setAccountId(response.data.body.account_id);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAccountId();
  });

  return <div id='account'>{accountId}</div>;
}

export default Account;
