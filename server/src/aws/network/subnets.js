import EC2 from 'aws-sdk/clients/ec2.js';
import successMessages, { createGetResponse } from '../../success.js';
import errorMessages, { createAuthErrorResponse } from '../../errors.js';

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

export default listSubnets;
