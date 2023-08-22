import AWS from 'aws-sdk';

async function fetchCloudfrontDistributions(awsRegion) {
  const result = [];
  try {
    const cloudfront = new AWS.CloudFront({ region: awsRegion });
    // Call the DescribeInstances API to retrieve information about instances
    const cloudfrontDataResponse = await cloudfront
      .listDistributions()
      .promise();

    // Extract each instance
    result.push(...cloudfrontDataResponse.DistributionList.Items);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchCloudfrontDistributions;
