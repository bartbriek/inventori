import './region.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullRegionComponent from './full-region-component/full-region-component';

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
  const ec2InstancesResponse = await axios.get(
    'http://localhost:3010/compute/ec2',
  );
  const ec2Instances = ec2InstancesResponse.data.body;

  // Fetch all s3 buckets
  const s3BucketsResponse = await axios.get(
    'http://localhost:3010/storage/s3buckets',
  );
  const s3Buckets = s3BucketsResponse.data.body;

  const result = { vpcs: [], buckets: [], dynamodb: [], rds: [] };

  // Add vpcs to the result object
  vpcs.forEach(vpc => {
    result.vpcs[vpc.VpcId] = {
      ...vpc,
      subnets: [],
    };
  });

  // Add subnets to the result object
  subnets.forEach(subnet => {
    if (result.vpcs[subnet.VpcId]) {
      result.vpcs[subnet.VpcId].subnets.push({
        ...subnet,
        instances: [],
      });
    }
  }, []);

  // Add ec2 instances to the right subnets
  ec2Instances.forEach(instance => {
    if (result.vpcs[instance.VpcId]) {
      const subnet = result.vpcs[instance.VpcId].subnets.find(
        subnet => subnet.SubnetId === instance.SubnetId,
      );
      if (subnet) {
        subnet.instances.push(instance);
      }
    }
  });

  // Add S3 buckets to result object
  s3Buckets.forEach(bucket => {
    result['buckets'].push(bucket);
  });

  return result;
}

function Region({ region }) {
  const [fetchedResources, setFetchedResources] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData();
      setFetchedResources(Object.keys(result.vpcs));
    };

    fetchDataAsync();
    console.log(fetchedResources);
  }, []);

  return (
    <>
      <div id='region'>
        {region}
        <div id='resources'>
          <FullRegionComponent resources={fetchedResources} />
        </div>
      </div>
    </>
  );
}

export default Region;
