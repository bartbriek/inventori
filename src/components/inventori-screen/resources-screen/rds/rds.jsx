import React from 'react';
import './rds.css';

function Rds({ instance }) {
  return <div id='rds-instance'>{instance.DBIdentifier}</div>;
}

export default Rds;
