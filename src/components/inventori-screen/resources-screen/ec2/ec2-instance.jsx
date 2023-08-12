import React, { useState } from 'react';
import './ec2-instance.css';

function Ec2Instance({ instance }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleMouseOver() {
    setShowDetails(true);
  }

  function handleMouseOut() {
    setShowDetails(false);
  }

  return (
    <div id='ec2-instance'>
      <img
        id='ec2-image-logo'
        src='https://upload.wikimedia.org/wikipedia/commons/b/b9/AWS_Simple_Icons_Compute_Amazon_EC2_Instances.svg'
        alt='EC2 image logo'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      EC2 instance
      {showDetails ? <p id='ec2-instance-name'>{instance.InstanceId}</p> : null}
    </div>
  );
}

export default Ec2Instance;
