import './region.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullRegionComponent from './full-region-component/full-region-component';
import { Paper } from '@mui/material';

async function fetchData() {
  // step 1: fetch all vpcs
  const vpcResponse = await axios.get('http://localhost:3010/network/vpcs');
  const vpcs = vpcResponse.data.body;

  // step 2: fetch all subnets
  const subnetsResponse = await axios.get(
    'http://localhost:3010/network/subnets',
  );
  const subnets = subnetsResponse.data.body;

  // step 3: fetch all ec2 instances
  const ec2InstancesResponse = axios.get('http://localhost:3010/compute/ec2');
  const ec2Instances = (await ec2InstancesResponse).data.body;

  const result = {};

  vpcs.forEach(vpc => {
    result[vpc.VpcId] = {
      ...vpc,
      subnets: [],
    };
  });

  // Add subnets to the result object
  subnets.forEach(subnet => {
    if (result[subnet.VpcId]) {
      result[subnet.VpcId].subnets.push({
        ...subnet,
        instances: [],
      });
    }
  }, []);

  // Add ec2 instances to the right subnets
  ec2Instances.forEach(instance => {
    if (result[instance.VpcId]) {
      const subnet = result[instance.VpcId].subnets.find(
        subnet => subnet.SubnetId === instance.SubnetId,
      );
      if (subnet) {
        subnet.instances.push(instance);
      }
    }
  });

  const final = Object.values(result);
  console.log(final);
  return final;
}

function Region({ region }) {
  const [fetchedResources, setFetchedResources] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData();
      setFetchedResources(result);
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <Paper id='region'>
        {region}
        <div id='resources'>
          <FullRegionComponent resources={fetchedResources} />
        </div>
      </Paper>
    </>
  );
}

export default Region;
