import AWS from 'aws-sdk';

const aggregateSubnetIds = instance => {
  const result = instance;

  // Aggregate Subnets Ids in single array for frontend.
  const subnetIds = [];
  instance.DBSubnetGroup.Subnets.forEach(subnet => {
    subnetIds.push(subnet.SubnetIdentifier);
  });

  result.SubnetIds = subnetIds;
  return result;
};

async function fetchRdsInstances(awsRegion) {
  const result = [];

  try {
    const rds = new AWS.RDS({ region: awsRegion });
    // Call the describeDBInstances API to retrieve information about standalone instances
    const instances = await rds.describeDBInstances().promise();

    // Loop through each standalone instance
    for (const instance of instances.DBInstances) {
      result.push(aggregateSubnetIds(instance));
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchRdsInstances;
