import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import AWS from 'aws-sdk';

import { validateSession } from './session.js';
import { getCurrentAccountId } from './sts.js';
import { fetchAwsResources } from './resources.js';
import { createGetResponse, successMessages } from './common/success.js';
import { determineCorrelations } from './correlations.js';
import fetchVpcs from './aws-resources/vpcs.js';
import fetchS3Buckets from './aws-resources/s3.js';
import fetchSubnets from './aws-resources/subnets.js';
import fetchRoutes from './aws-resources/routes.js';
import fetchEc2Instances from './aws-resources/ec2.js';
import fetchRdsInstances from './aws-resources/rds.js';
import fetchLambdaFunctions from './aws-resources/lambda.js';
import fetchDynamoDbTables from './aws-resources/dynamodb.js';
import fetchEcsResources from './aws-resources/ecs.js';

// CONSTANTS
const app = express();
const port = 3010;

// INIT VARIABLES
let credentials = new AWS.Credentials({
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  sessionToken: 'dummy',
});

// AWS SDK
AWS.config.logger = console;
let awsRegion = 'eu-west-1';

// CORS
let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors(corsOptions));

// AUTH ENDPOINTS
app.get('/session', (req, res) => {
  const sessionResponse = validateSession(
    credentials.accessKeyId,
    credentials.secretAccessKey,
    credentials.sessionToken,
  );

  res.status(sessionResponse.statusCode);
  res.send(sessionResponse);
});

app.put('/session', (req, res) => {
  credentials.accessKeyId = 'dummy';
  credentials.secretAccessKey = 'dummy';
  credentials.sessionToken = 'dummy';

  res.status(200);
  res.send({ statusCode: 200, status: 'SUCCESS', body: {} });
});

app.post('/credentials', (req, res) => {
  const requestBody = req.body;
  credentials = {
    accessKeyId: requestBody.access_key,
    secretAccessKey: requestBody.secret_key,
    sessionToken: requestBody.session_token,
  };

  AWS.config.update(credentials);
  res.status(successMessages.CreatedSuccess.statusCode);
  res.send(successMessages.CreatedSuccess);
});

// GOVERNANCE ENDPOINTS
app.get('/accounts', async (req, res) => {
  await getCurrentAccountId(res);
});

app.get('/region/availability-zones', async (req, res) => {
  const ec2 = new AWS.EC2({ region: awsRegion });
  const availabilityZonesData = await ec2.describeAvailabilityZones().promise();

  const availabilityZones = () => {
    const zones = [];
    availabilityZonesData.AvailabilityZones?.forEach(zone => {
      if (!zones.includes(zone.ZoneName)) {
        zones.push(zone.ZoneName);
      }
    });
    return zones;
  };

  res.status(200);
  res.send(createGetResponse(availabilityZones()));
});

app.put('/region/:regionId', (req, res) => {
  awsRegion = req.params.regionId;
  res.status(successMessages.PutSuccess.statusCode);
  res.send(successMessages.PutSuccess);
});

// Resources endpoints
app.get('/resources', async (req, res) => {
  // fetch resources
  const resources = await fetchAwsResources(awsRegion);

  // Make the connections
  const responseBody = determineCorrelations(resources);
  res.status(200);
  res.send(createGetResponse(responseBody));
});

// Storage related endpoints
app.get('/resources/s3buckets', async (req, res) => {
  const buckets = await fetchS3Buckets(awsRegion);
  res.status(200);
  res.send(createGetResponse(buckets));
});

app.get('/resources/rdsInstances', async (req, res) => {
  const rdsInstances = await fetchRdsInstances(awsRegion);
  res.status(200);
  res.send(createGetResponse(rdsInstances));
});

app.get('/resources/dynamodb', async (req, res) => {
  const dynamoDbTables = await fetchDynamoDbTables(awsRegion);
  res.status(200);
  res.send(createGetResponse(dynamoDbTables));
});

// Networking related endpoints
app.get('/resources/vpcs', async (req, res) => {
  const vpcs = await fetchVpcs(awsRegion);
  res.status(200);
  res.send(createGetResponse(vpcs));
});

app.get('/resources/subnets', async (req, res) => {
  const subnets = await fetchSubnets(awsRegion);
  res.status(200);
  res.send(createGetResponse(subnets));
});

app.get('/resources/routes', async (req, res) => {
  const routes = await fetchRoutes(awsRegion);
  res.status(200);
  res.send(createGetResponse(routes));
});

// Compute related endpoints
app.get('/resources/ec2Instances', async (req, res) => {
  const ec2Instances = await fetchEc2Instances(awsRegion);
  res.status(200);
  res.send(createGetResponse(ec2Instances));
});

app.get('/resources/ecsInstances', async (req, res) => {
  const ecsInstances = await fetchEcsResources(awsRegion);
  res.status(200);
  res.send(createGetResponse(ecsInstances));
});

app.get('/resources/lambdas', async (req, res) => {
  const lambdaFunctions = await fetchLambdaFunctions(awsRegion);
  res.status(200);
  res.send(createGetResponse(lambdaFunctions));
});

// MAIN
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
