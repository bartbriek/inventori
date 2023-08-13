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

app.get('/regions', async (req, res) => {
  // fetch resources
  const resources = await fetchAwsResources(awsRegion);

  // Make the connections
  const responseBody = determineCorrelations(resources);
  res.status(200);
  res.send(createGetResponse(responseBody));
});

app.put('/regions/:regionId', (req, res) => {
  awsRegion = req.params.regionId;
  res.status(successMessages.PutSuccess.statusCode);
  res.send(successMessages.PutSuccess);
});

// MAIN
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
