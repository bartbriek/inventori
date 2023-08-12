import React from 'react';
import './dynamodb.css';

function Dynamodb({ dynamoDbTable }) {
  return <div id='dynamodb-table'>{dynamoDbTable.TableName}</div>;
}

export default Dynamodb;
