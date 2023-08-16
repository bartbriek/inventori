import AWS from 'aws-sdk';

async function fetchEc2Instances(awsRegion) {
  const result = [];
  try {
    const ec2 = new AWS.EC2({ region: awsRegion });
    // Call the DescribeInstances API to retrieve information about instances
    const instanceDataResponse = await ec2.describeInstances().promise();

    // Extract each instance
    instanceDataResponse.Reservations.forEach(reservation => {
      result.push(...reservation.Instances);
    });
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchEc2Instances;
