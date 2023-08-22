import AWS from 'aws-sdk';

async function fetchIamUsers(awsRegion) {
  const result = [];
  try {
    const iam = new AWS.IAM({ region: awsRegion });
    // Call the DescribeInstances API to retrieve information about instances
    const usersDataResponse = await iam.listUsers().promise();
    result.push(...usersDataResponse.Users);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchIamUsers;
