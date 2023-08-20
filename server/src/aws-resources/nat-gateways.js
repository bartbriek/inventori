import AWS from 'aws-sdk';

async function fetchNatGateways(awsRegion) {
  const result = [];
  try {
    // Fetch Internet Gateways
    const ec2 = new AWS.EC2({ region: awsRegion });
    const natGatewaysResponse = await ec2.describeNatGateways().promise();

    result.push(...natGatewaysResponse.NatGateways);
    return zones;
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchNatGateways;
