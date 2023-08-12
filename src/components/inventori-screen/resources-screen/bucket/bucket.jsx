import React, { useState } from 'react';
import './bucket.css';

function Bucket({ bucket }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleMouseOver() {
    setShowDetails(true);
  }

  function handleMouseOut() {
    setShowDetails(false);
  }

  return (
    <div id='bucket'>
      <img
        id='s3bucket-image-logo'
        src='https://res.cloudinary.com/practicaldev/image/fetch/s--o9jchbR7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://day-journal.com/memo/images/logo/aws/s3.png'
        alt='S3 Bucket logo'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      S3 Bucket
      {showDetails ? <p>{bucket.Name}</p> : null}
    </div>
  );
}

export default Bucket;
