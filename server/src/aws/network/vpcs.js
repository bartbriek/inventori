import EC2 from 'aws-sdk/clients/ec2.js';
import errorMessages, { createAuthErrorResponse } from '../../errors.js';
import successMessages, { createGetResponse } from '../../success.js';

async function listVpcs(axiosResponse, region) {
  try {
    const ec2 = new EC2({ region: region });
    const vpcData = await ec2.describeVpcs({}).promise();
    axiosResponse.status(successMessages.GetSuccess.statusCode);
    axiosResponse.send(createGetResponse(vpcData.Vpcs));
  } catch (err) {
    // TODO: Do proper error handling for CredentialsError. Request keeps hanging.
    if (err.code === 'CredentialsError') {
      axiosResponse.status(errorMessages.AWSAuthError.statusCode);
      axiosResponse.send(createAuthErrorResponse());
    }
  }
}

export default listVpcs;
