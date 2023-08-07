import EC2 from 'aws-sdk/clients/ec2.js';
import { createAuthErrorResponse } from '../../errors.js';
import successMessages, { createGetResponse } from '../../success.js';

async function handleEc2Request(axiosResponse) {
  try {
    const ec2 = new EC2({ region: 'eu-west-1' });
    const ec2Instances = await ec2.describeInstances({}).promise();
    console.log(ec2Instances);
    axiosResponse.status(successMessages.GetSuccess.statusCode);
    axiosResponse.send(createGetResponse(ec2Instances.Reservations));
  } catch (err) {
    // TODO: Fix general error handling
    console.log(createAuthErrorResponse());
  }
}

export default handleEc2Request;
