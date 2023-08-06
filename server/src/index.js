import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import AWS from 'aws-sdk';
import validateSession from './session.js';
import errorMessages, { createAuthErrorResponse } from './errors.js';
import successMessages, { createGetResponse } from './success.js';

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

// NETWORK ENDPOINTS
app.get('/network/vpc', async (req, res) => {
  const ec2 = new AWS.EC2({ region: 'eu-west-1' });

  try {
    const vpcData = await ec2.describeVpcs({}).promise();
    res.status(successMessages.GetSuccess.statusCode);
    res.send(createGetResponse(vpcData.Vpcs));
  } catch (err) {
    // TODO: Do proper error handling for CredentialsError. Request keeps hanging.
    if (err.code === 'CredentialsError') {
      res.status(errorMessages.AWSAuthError.statusCode);
      res.send(errorMessages.AWSAuthError);
    }
  }
});

// MAIN
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
