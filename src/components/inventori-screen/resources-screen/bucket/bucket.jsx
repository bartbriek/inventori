import React from 'react';
import './bucket.css';

function Bucket({ bucket }) {
  return <div id='bucket'>{bucket.Name}</div>;
}

export default Bucket;
