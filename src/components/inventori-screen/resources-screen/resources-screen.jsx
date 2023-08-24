import './resources-screen.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../baseConfig';
import Vpc from './vpc/vpc';
import ResourceComponent from './resource-component/resource-component';
import { LinearProgress, Typography } from '@mui/material';

function ResourcesScreen({ region }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [iamUsers, setIamUsers] = useState([]);
  const [iamRoles, setIamRoles] = useState([]);
  const [subnets, setSubnets] = useState([]);
  const [vpcs, setVpcs] = useState([]);
  const [routeTables, setRouteTables] = useState([]);
  const [internetGateways, setInternetGateways] = useState([]);
  const [natGateways, setNatGateways] = useState([]);
  const [apiGateways, setApiGateways] = useState([]);
  const [snsTopics, setSnsTopics] = useState([]);
  const [sqsQueues, setSqsQueues] = useState([]);
  const [cloudfrontDistributions, setCloudfrontDistributions] = useState([]);
  const [ec2Instances, setEc2Instances] = useState([]);
  const [ecsInstances, setEcsInstances] = useState([]);
  const [rdsInstances, setRdsInstances] = useState([]);
  const [lambdaFunctions, setLambdaFunctions] = useState([]);
  const [s3Buckets, setS3Buckets] = useState([]);
  const [dynamoDbTables, setDynamoDbTables] = useState([]);

  // amount of request we are doing to calculate the progress loader for resources screen.
  let progressVariable = 0;
  const resourcesRequestCount = 17;
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
        .get(`${BASE_URL}/resources/api-gateways`)
        .then(apiGatewayResponse => {
          setApiGateways(apiGatewayResponse.data.body);
          progressVariable = progressVariable + resourceRequestPercentage;
          setProgress(progressVariable);
        });

      await axios.get(`${BASE_URL}/resources/sns`).then(snsResponse => {
        setSnsTopics(snsResponse.data.body);
        progressVariable = progressVariable + resourceRequestPercentage;
        setProgress(progressVariable);
      });

      await axios.get(`${BASE_URL}/resources/sqs`).then(sqsResponse => {
        setSqsQueues(sqsResponse.data.body);
        progressVariable = progressVariable + resourceRequestPercentage;
        setProgress(progressVariable);
      });

      await axios
        .get(`${BASE_URL}/resources/cloudfront`)
        .then(distributionsResponse => {
          setCloudfrontDistributions(distributionsResponse.data.body);
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

      await axios.get(`${BASE_URL}/resources/iam-users`).then(users => {
        setIamUsers(users.data.body);
        progressVariable = progressVariable + resourceRequestPercentage;
        setProgress(progressVariable);
      });

      await axios.get(`${BASE_URL}/resources/iam-roles`).then(roles => {
        setIamRoles(roles.data.body);
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

  const getCloudfrontName = distribution => {
    let disitributionName = distribution.Id;
    if (distribution.AliasICPRecordals.length > 0) {
      disitributionName = distribution.AliasICPRecordals[0].CNAME;
    }
    return disitributionName;
  };

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
        <>
          <div className='global-resources-container'>
            <Typography
              style={{ margin: '20px 0px 0px 20px', fontWeight: 'bold' }}
            >
              Global
            </Typography>
            <div className='iam-users-container'></div>
            <div className='iam-roles-container'></div>
            <div className='resources-container'>
              {cloudfrontDistributions.map(distribution => {
                return (
                  <ResourceComponent
                    key={distribution.ID}
                    resourceType={getCloudfrontName(distribution)}
                    imageName='cloudfrontDistributionLogo'
                  />
                );
              })}
            </div>
            <div className='resources-container'>
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
          </div>

          <div id='region-container'>
            <div className='region-resources-container'>
              <Typography
                style={{ margin: '20px 0px 0px 20px', fontWeight: 'bold' }}
              >
                {region}
              </Typography>
              <div className='resources-container'>
                {apiGateways.map(gateway => {
                  return (
                    <ResourceComponent
                      key={gateway.id}
                      resourceType={gateway.name}
                      imageName='apiGatewayLogo'
                    />
                  );
                })}
              </div>
              <div className='resources-container'>
                {snsTopics.map(topic => {
                  return (
                    <ResourceComponent
                      key={topic.TopicArn}
                      resourceType={topic.TopicArn}
                      imageName='snsTopicLogo'
                    />
                  );
                })}
              </div>
              <div className='resources-container'>
                {sqsQueues.map(queue => {
                  return (
                    <ResourceComponent
                      key={queue.QueueUrl}
                      resourceType={queue.QueueUrl}
                      imageName='sqsQueueLogo'
                    />
                  );
                })}
              </div>
              <div className='resources-container'>
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
              <div className='resources-container'>
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
        </>
      )}
    </>
  );
}

export default ResourcesScreen;
