import AWS from 'aws-sdk';

async function fetchS3Buckets(awsRegion) {
  const result = [];
  try {
    const s3 = new AWS.S3({ region: awsRegion });
    // Call the listBuckets API to retrieve a list of bucket names
    const bucketList = await s3.listBuckets().promise();
    result.push(...bucketList.Buckets);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchS3Buckets;
