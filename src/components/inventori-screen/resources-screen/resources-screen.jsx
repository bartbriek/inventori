import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vpc from './vpc/vpc';
import { CircularProgress } from '@mui/material';
import Bucket from './bucket/bucket';
import Lambda from './lambda/lambda';
import Dynamodb from './dynamodb/dynamodb';

function ResourcesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    const response = await axios.get('http://localhost:3010/regions');
    return response.data.body;
  };

  useEffect(() => {
    fetchResources().then(response => {
      setResources(response);
      setIsLoading(false);
    });
  }, []);

  const generateResourceComponents = () => {
    return (
      <>
        <div className='vpcs'>
          {resources.vpc.map(vpc => {
            return <Vpc key={vpc.VpcId} vpc={vpc} />;
          })}
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
    <div>{isLoading ? <CircularProgress /> : generateResourceComponents()}</div>
  );
}

export default ResourcesScreen;
