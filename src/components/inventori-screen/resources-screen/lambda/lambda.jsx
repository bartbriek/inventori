import React, { useState } from 'react';
import './lambda.css';

function Lambda({ lambdaFunction }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleMouseOver() {
    setShowDetails(true);
  }

  function handleMouseOut() {
    setShowDetails(false);
  }

  return (
    <div id='lambda-function'>
      <img
        id='lambda-function-logo'
        src='https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg'
        alt='Lambda function logo'
        onMouseOver={handleMouseOver}
        // onMouseOut={handleMouseOut}
      />
      AWS Lambda
      {showDetails ? (
        <p id='lambda-function-name'>{lambdaFunction.FunctionName}</p>
      ) : null}
    </div>
  );
}

export default Lambda;
