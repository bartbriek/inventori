import AWS from 'aws-sdk';

async function fetchApiGateways(awsRegion) {
  const result = [];
  try {
    const apiGateway = new AWS.ApiGatewayV2({ region: awsRegion });
    const legacyApiGateways = new AWS.APIGateway({ region: awsRegion });

    // Call v1 api gateways
    const legacyApiGatewayDataResponse = await legacyApiGateways
      .getRestApis()
      .promise();

    // Call v2 api gateways
    const apiGatewayDataResponse = await apiGateway.getApis().promise();

    // Loop through each table name and describe the table
    result.push(...legacyApiGatewayDataResponse.items);
    result.push(...apiGatewayDataResponse.Items);

    // Call v1 api gateways
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchApiGateways;
