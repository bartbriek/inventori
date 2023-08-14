import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vpc from './vpc/vpc';
import { CircularProgress } from '@mui/material';
import Bucket from './bucket/bucket';
import Lambda from './lambda/lambda';
import Dynamodb from './dynamodb/dynamodb';
import './resources-screen.css';

function ResourcesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [availabilityZones, setAvailabilityZones] = useState([]);

  const fetchAvailabilityZones = async () => {
    const response = await axios.get(
      'http://localhost:3010/region/availability-zones',
    );
    return response.data.body;
  };

  const fetchResources = async () => {
    const response = await axios.get('http://localhost:3010/resources');
    return response.data.body;
  };

  useEffect(() => {
    fetchAvailabilityZones()
      .then(response => {
        setAvailabilityZones(response);
      })
      .catch(err => {
        console.log(err);
      });

    fetchResources()
      .then(response => {
        setResources(response);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const generateResourceComponents = zones => {
    return (
      <>
        <div id='region'>
          Region
          <div className='vpcs'>
            {resources.vpc.map(vpc => {
              return <Vpc key={vpc.VpcId} vpc={vpc} />;
            })}
          </div>
        </div>
        <div className='buckets'>
          {resources.s3.map(bucket => {
            return <Bucket key={bucket.BucketName} bucket={bucket} />;
          })}
        </div>
        <div className='lambda-functions'>
          {resources.lambda.map(lambdaFunction => {
            return (
              <Lambda
                key={lambdaFunction.FunctionArn}
                lambdaFunction={lambdaFunction}
              />
            );
          })}
        </div>
        <div className='dynamodb-tables'>
          {resources.dynamodb.map(table => {
            return <Dynamodb key={table.TableArn} dynamoDbTable={table} />;
          })}
        </div>
      </>
    );
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        generateResourceComponents(availabilityZones)
      )}
    </div>
  );
}

export default ResourcesScreen;
