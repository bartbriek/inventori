import React, { useState } from 'react';
import './rds.css';

function Rds({ instance }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleMouseOver() {
    setShowDetails(true);
  }

  function handleMouseOut() {
    setShowDetails(false);
  }

  return (
    <div id='rds-instance'>
      <img
        id='rds-instance-logo'
        src='https://logowik.com/content/uploads/images/aws-rds2214.logowik.com.webp'
        alt='RDS instance logo'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      RDS instance
      {showDetails ? <p>{instance.DBIdentifier}</p> : null}
    </div>
  );
}

export default Rds;
