import EC2 from 'aws-sdk/clients/ec2.js';
import { createAuthErrorResponse } from '../../errors.js';
import successMessages, { createGetResponse } from '../../success.js';

async function handleEc2Request(axiosResponse) {
  try {
    const ec2 = new EC2({ region: 'eu-west-1' });
    const response = await ec2.describeInstances({}).promise();
    const instances = [];

    response.Reservations.forEach(reservation => {
      reservation.Instances.forEach(instance => {
        instances.push(instance);
      });
    });

    axiosResponse.status(successMessages.GetSuccess.statusCode);
    axiosResponse.send(createGetResponse(instances));
  } catch (err) {
    // TODO: Fix general error handling
    console.log(createAuthErrorResponse());
  }
}

export default handleEc2Request;
