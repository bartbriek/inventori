import React, { useState } from 'react';
import './dynamodb.css';

function Dynamodb({ dynamoDbTable }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleMouseOver() {
    setShowDetails(true);
  }

  function handleMouseOut() {
    setShowDetails(false);
  }

  return (
    <div id='dynamodb-table'>
      <img
        id='dynamodb-image-logo'
        src='https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png'
        alt='DynamoDB logo'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      DynamoDB table
      {showDetails ? <p>{dynamoDbTable.TableName}</p> : null}
    </div>
  );
}

export default Dynamodb;
