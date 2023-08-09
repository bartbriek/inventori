import React from 'react';
import './account.css';
import Region from './region/region'

function Account({ accountId, region }) {
  return <div id="account">{accountId}<div><Region accountId={accountId} region={region}/></div></div>
}

export default Account;
