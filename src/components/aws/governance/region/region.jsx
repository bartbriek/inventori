import React, { useState } from 'react';

const REGIONS = ['us-east-1', 'eu-west-1', 'eu-central-1'];

function Region() {
  const [region, setRegion] = useState(REGIONS[0]);

  return <div>Region</div>;
}

export default Region;
