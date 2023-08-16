import AWS from 'aws-sdk';

async function fetchDynamoDbTables(awsRegion) {
  const result = [];
  try {
    const dynamodb = new AWS.DynamoDB({ region: awsRegion });

    // Call the ListTables API to retrieve a list of table names
    const tableList = await dynamodb.listTables().promise();

    // Loop through each table name and describe the table
    for (const tableName of tableList.TableNames) {
      const tableDescription = await dynamodb
        .describeTable({ TableName: tableName })
        .promise();
      const table = tableDescription.Table;
      result.push(table);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchDynamoDbTables;
