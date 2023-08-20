import AWS from 'aws-sdk';

async function fetchInternetGateways(awsRegion) {
  const result = [];
  try {
    // Fetch Internet Gateways
    const ec2 = new AWS.EC2({ region: awsRegion });
    const internetGatewayResponse = await ec2
      .describeInternetGateways()
      .promise();

    result.push(...internetGatewayResponse.InternetGateways);
    return zones;
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchInternetGateways;
