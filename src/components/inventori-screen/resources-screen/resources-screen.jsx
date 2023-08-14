import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { CircularProgress } from '@mui/material';
import './resources-screen.css';
import ResourceComponent from './resource-component/resource-component';

function ResourcesScreen({ regionFlag }) {
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
          <div className='buckets'>
            {resources.s3.map(bucket => {
              return (
                <ResourceComponent
                  key={bucket.BucketName}
                  resourceName={bucket.Name}
                  imageSrc='https://res.cloudinary.com/practicaldev/image/fetch/s--o9jchbR7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://day-journal.com/memo/images/logo/aws/s3.png'
                />
              );
            })}
          </div>
          <div className='lambda-functions'>
            {resources.lambda.map(lambdaFunction => {
              return (
                <ResourceComponent
                  key={lambdaFunction.FunctionArn}
                  imageSrc='https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg'
                  resourceName={lambdaFunction.FunctionName}
                />
              );
            })}
          </div>
          <div className='dynamodb-tables'>
            {resources.dynamodb.map(table => {
              return (
                <ResourceComponent
                  key={table.TableArn}
                  imageSrc='https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png'
                  resourceName={table.TableName}
                />
              );
            })}
          </div>
          {/* <div className='vpcs'>
            {resources.vpc.map(vpc => {
              return <Vpc key={vpc.VpcId} vpc={vpc} />;
            })}
          </div> */}
        </div>
      </>
    );
  };

  return (
    <div>
      {isLoading ? (
        <div id='spinner-container'>
          <CircularProgress />
        </div>
      ) : (
        generateResourceComponents(availabilityZones)
      )}
    </div>
  );
}

export default ResourcesScreen;
