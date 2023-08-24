import AWS from 'aws-sdk';

async function fetchSnsTopics(awsRegion) {
  const result = [];
  try {
    const sns = new AWS.SNS({ region: awsRegion });
    // Call the listBuckets API to retrieve a list of bucket names
    const topicsDataResponse = await sns.listTopics().promise();
    result.push(...topicsDataResponse.Topics);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchSnsTopics;
