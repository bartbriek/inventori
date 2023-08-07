import './vpc.css';
import React, { useEffect, useState } from 'react';
import Ec2Instance from '../../compute/ec2/ec2-instance';
import axios from 'axios';

function Vpc(props) {
  const [ec2Instances, setEc2Instances] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3010/compute/ec2').then(res => {
      setEc2Instances(res.data.body);
    });
  }, []);

  return (
    <div id='vpc'>
      <h2>{props.vpc.VpcId}</h2>
      <div>
        {ec2Instances.map(instance => {
          return <Ec2Instance instance={instance} />;
        })}
      </div>
    </div>
  );
}

export default Vpc;

// {
//   ec2Instances.map(instance => {
//     console.log(instance);
//     return <Ec2Instance instance={instance} />;
//   });
// }
