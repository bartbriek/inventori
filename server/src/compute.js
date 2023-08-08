import EC2 from 'aws-sdk/clients/ec2.js';
import { createAuthErrorResponse } from './common/errors.js';
import { createGetResponse, successMessages } from './common/success.js';

async function listEc2Instances(axiosResponse, region) {
  try {
    const ec2 = new EC2({ region: region });
    console.log(region);
    const response = await ec2.describeInstances({}).promise();
    console.log(response);
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

export { listEc2Instances };
