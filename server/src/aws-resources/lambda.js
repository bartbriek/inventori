import AWS from 'aws-sdk';

async function fetchLambdaFunctions(awsRegion) {
  const result = [];
  try {
    const lambda = new AWS.Lambda({ region: awsRegion });
    const lambdaFunctions = [];
    let nextMarker = null;

    // Fetch lambdas first by listing them
    do {
      const params = {
        Marker: nextMarker,
        MaxItems: 50,
      };

      const lambdaDataResponse = await lambda.listFunctions(params).promise();

      lambdaFunctions.push(...lambdaDataResponse.Functions);
      nextMarker = lambdaDataResponse.NextMarker;
    } while (nextMarker);

    // Describe each lambda function for more detailed information
    for (const lambdaFunction of lambdaFunctions) {
      const detailedFunction = await lambda
        .getFunction({ FunctionName: lambdaFunction.FunctionName })
        .promise();
      result.push(detailedFunction);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchLambdaFunctions;
