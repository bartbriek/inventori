import AWS from 'aws-sdk';
import { createGetResponse, successMessages } from './common/success.js';
import { createAuthErrorResponse, errorMessages } from './common/errors.js';

async function getCurrentAccountId(axiosResponse) {
  try {
    const sts = new AWS.STS();
    const response = await sts.getCallerIdentity({}).promise();
    console.log(response);
    axiosResponse.status(successMessages.GetSuccess.statusCode);
    axiosResponse.send(createGetResponse({ account_id: response.Account }));
  } catch (err) {
    console.error('Error getting AWS account ID:', err);
    axiosResponse.status(errorMessages.AWSAuthError.statusCode);
    axiosResponse.send(createAuthErrorResponse());
  }
}

export { getCurrentAccountId };
