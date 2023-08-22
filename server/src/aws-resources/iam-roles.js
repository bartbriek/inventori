import AWS from 'aws-sdk';

async function fetchIamRoles(awsRegion) {
  const result = [];
  try {
    const iam = new AWS.IAM({ region: awsRegion });
    // Call the DescribeInstances API to retrieve information about instances
    const rolesDataResponse = await iam.listRoles().promise();
    result.push(...rolesDataResponse.Roles);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchIamRoles;
