import React from 'react';
import './lambda.css';

function Lambda({ lambdaFunction }) {
  return <div id='lambda-function'>{lambdaFunction.FunctionName}</div>;
}

export default Lambda;
