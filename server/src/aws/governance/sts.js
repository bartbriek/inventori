import STS from 'aws-sdk/clients/sts.js';
import successMessages, { createGetResponse } from '../../success.js';
import errorMessages, { createAuthErrorResponse } from '../../errors.js';

async function getCurrentAccountId(axiosResponse) {
  try {
    const sts = new STS();
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

export default getCurrentAccountId;
