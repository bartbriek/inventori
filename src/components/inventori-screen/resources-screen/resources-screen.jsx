import './resources-screen.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../baseConfig';
import Vpc from './vpc/vpc';
import ResourceComponent from './resource-component/resource-component';
import { LinearProgress, Typography } from '@mui/material';

function ResourcesScreen({ region }) {
  const [subnets, setSubnets] = useState([]);
  const [vpcs, setVpcs] = useState([]);
  const [routeTables, setRouteTables] = useState([]);
  const [internetGateways, setInternetGateways] = useState([]);
  const [natGateways, setNatGateways] = useState([]);
  const [ec2Instances, setEc2Instances] = useState([]);
  const [ecsInstances, setEcsInstances] = useState([]);
  const [rdsInstances, setRdsInstances] = useState([]);
  const [lambdaFunctions, setLambdaFunctions] = useState([]);
  const [s3Buckets, setS3Buckets] = useState([]);
  const [dynamoDbTables, setDynamoDbTables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // amount of request we are doing to calculate the progress loader for resources screen.
  let progressVariable = 0;
  const resourcesRequestCount = 11;
  const resourceRequestPercentage = 100 / resourcesRequestCount;

  useEffect(() => {
    // VPC resources
    const fetchResources = async () => {
      await axios.get(`${BASE_URL}/resources/vpcs`).then(vpcResponse => {
        setVpcs(vpcResponse.data.body);
        progressVariable = progressVariable + resourceRequestPercentage;
        setProgress(progressVariable);
      });

      await axios.get(`${BASE_URL}/resources/subnets`).then(subnetResponse => {
        setSubnets(subnetResponse.data.body);
        progressVariable = progressVariable + resourceRequestPercentage;
        setProgress(progressVariable);
      });

      await axios.get(`${BASE_URL}/resources/routes`).then(routesResponse => {
        setRouteTables(routesResponse.data.body);
        progressVariable = progressVariable + resourceRequestPercentage;
        setProgress(progressVariable);
      });

      await axios
        .get(`${BASE_URL}/resources/internet-gateways`)
        .then(iGResponse => {
          setInternetGateways(iGResponse.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });

      await axios
        .get(`${BASE_URL}/resources/nat-gateways`)
        .then(natGatewayResponse => {
          setNatGateways(natGatewayResponse.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });

      await axios
        .get(`${BASE_URL}/resources/ec2Instances`)
        .then(ec2Response => {
          setEc2Instances(ec2Response.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });

      await axios
        .get(`${BASE_URL}/resources/ecsInstances`)
        .then(ecsResponse => {
          setEcsInstances(ecsResponse.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });

      await axios
        .get(`${BASE_URL}/resources/rdsInstances`)
        .then(rdsResponse => {
          setRdsInstances(rdsResponse.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });

      // Global & regional resources
      await axios.get(`${BASE_URL}/resources/lambdas`).then(lambdasResponse => {
        setLambdaFunctions(lambdasResponse.data.body);
        progressVariable = progressVariable + resourceRequestPercentage;
        setProgress(progressVariable);
      });

      await axios
        .get(`${BASE_URL}/resources/s3buckets`)
        .then(bucketsResponse => {
          setS3Buckets(bucketsResponse.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });

      await axios
        .get(`${BASE_URL}/resources/dynamodb`)
        .then(dynamodbResponse => {
          setDynamoDbTables(dynamodbResponse.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchResources();
  }, [region]);

  return (
    <>
      {isLoading ? (
        <div id='progress-loader-container'>
          <Typography>Fetching resources ...</Typography>
          <LinearProgress
            style={{
              margin: '30px 0px 0px 0px',
            }}
            variant='determinate'
            value={progress}
          />
        </div>
      ) : (
        <div id='region-container'>
          <div className='region-resources-container'>
            <div className='lambdaFunctions-container'>
              {lambdaFunctions.map(lambdaFunction => {
                return (
                  <ResourceComponent
                    key={lambdaFunction.Configuration.FunctionArn}
                    resourceType={lambdaFunction.Configuration.FunctionName}
                    imageName='lambdaFunctionLogo'
                  />
                );
              })}
            </div>
            <div className='s3Bucket-container'>
              {s3Buckets.map(bucket => {
                return (
                  <ResourceComponent
                    key={bucket.Name}
                    resourceType={bucket.Name}
                    imageName='s3BucketLogo'
                  />
                );
              })}
            </div>
            <div className='dynamodb-container'>
              {dynamoDbTables.map(table => {
                return (
                  <ResourceComponent
                    key={table.TableId}
                    resourceType={table.TableName}
                    imageName='dynamoDbLogo'
                  />
                );
              })}
            </div>
          </div>
          <div className='vpcs-container'>
            {vpcs.map(vpc => {
              return (
                <Vpc
                  key={vpc.VpcId}
                  vpc={vpc}
                  subnets={subnets}
                  routeTables={routeTables}
                  internetGateways={internetGateways}
                  natGateways={natGateways}
                  ec2Instances={ec2Instances}
                  ecsInstances={ecsInstances}
                  rdsInstances={rdsInstances}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ResourcesScreen;
