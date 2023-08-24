import AWS from 'aws-sdk';

async function fetchSqsQueues(awsRegion) {
  const result = [];
  try {
    const sqs = new AWS.SQS({ region: awsRegion });
    // Call the listBuckets API to retrieve a list of bucket names
    const queuesDataResponse = await sqs.listQueues().promise();

    if (queuesDataResponse.QueueUrls) {
      result.push(...queuesDataResponse.QueueUrls);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchSqsQueues;
