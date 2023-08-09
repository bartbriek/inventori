import React from 'react';
import Account from './account/account';

function ResourcesScreen({ accountId, region }) {
  return (
    <div>
      <Account accountId={accountId} region={region} />
    </div>
  );
}

export default ResourcesScreen;
