import './subnet.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subnet() {
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
          return <Ec2Instance key={instance.InstanceId} instance={instance} />;
        })}
      </div>
    </div>
  );
}

export default Subnet;
