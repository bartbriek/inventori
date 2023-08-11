import React from 'react';
import Account from './account/account';

function ResourcesScreen({ accountId, region }) {
  return (
    <>
      <Account accountId={accountId} region={region} />
    </>
  );
}

export default ResourcesScreen;
