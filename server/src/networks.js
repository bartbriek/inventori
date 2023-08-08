import EC2 from 'aws-sdk/clients/ec2.js';
import { createAuthErrorResponse, errorMessages } from './common/errors.js';
import { createGetResponse, successMessages } from './common/success.js';

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

async function listSubnets(axiosResponse, region) {
  try {
    const ec2 = new EC2({ region: region });
    const response = await ec2.describeSubnets().promise();
    const subnets = response.Subnets;
    console.log(subnets);
    axiosResponse.status(successMessages.GetSuccess.statusCode);
    axiosResponse.send(createGetResponse(subnets));
  } catch (err) {
    console.error('Error listing subnets:', err);
    axiosResponse.status(errorMessages.AWSAuthError.statusCode);
    axiosResponse.send(createAuthErrorResponse());
  }
}

export { listVpcs, listSubnets };
