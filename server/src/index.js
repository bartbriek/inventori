import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import AWS from 'aws-sdk';
import validateSession from './session.js';
import errorMessages, { createAuthErrorResponse } from './errors.js';
import successMessages, { createGetResponse } from './success.js';
import listEc2Instances from './aws/compute/ec2.js';
import listVpcs from './aws/network/vpcs.js';
import getCurrentAccountId from './aws/governance/sts.js';
import isValidRegion from './aws/governance/regions.js';
import listSubnets from './aws/network/subnets.js';

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
let aws_region = 'eu-west-1';

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

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

app.get('/credentials', (req, res) => {
  if (credentials.accessKeyId === 'dummy') {
    res.status(errorMessages.AWSAuthError.statusCode);
    res.send(createAuthErrorResponse());
  } else {
    res.status(successMessages.GetSuccess.statusCode);
    res.send(
      createGetResponse({
        credentials: {
          access_key: credentials.accessKeyId,
          secretKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken,
        },
      }),
    );
  }
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
app.get('/accounts', (req, res) => {
  getCurrentAccountId(res);
});

app.put('/regions/:regionId', (req, res) => {
  isValidRegion(req, res);
  aws_region = req.params.regionId;
  res.status(successMessages.PutSuccess.statusCode);
  res.send(successMessages.PutSuccess);
});

// NETWORK ENDPOINTS
app.get('/network/vpcs', (req, res) => {
  listVpcs(res, aws_region);
});

app.get('/network/subnets', (req, res) => {
  listSubnets(res, aws_region);
});

app.get('/compute/ec2', async (req, res) => {
  listEc2Instances(res, aws_region);
});

// MAIN
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
