import AWS from 'aws-sdk';

async function fetchRoutes(awsRegion) {
  const result = [];
  try {
    const ec2 = new AWS.EC2({ region: awsRegion });
    // Call the listBuckets API to retrieve a list of bucket names
    const routeTables = await ec2.describeRouteTables().promise();
    result.push(...routeTables.RouteTables);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchRoutes;
