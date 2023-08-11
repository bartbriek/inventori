import AWS from 'aws-sdk';

const fetchVpcs = async awsService => {
  const result = [];
  try {
    const vpcDataResponse = await awsService.describeVpcs().promise();
    result.push(...vpcDataResponse.Vpcs);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

const fetchSubnets = async awsService => {
  const result = [];
  try {
    const subNetsDataResponse = await awsService.describeSubnets().promise();
    result.push(...subNetsDataResponse.Subnets);
  } catch (error) {
    console.error('Error', error);
  }
  return result;
};

const fetchEc2Instances = async awsService => {
  const result = [];
  try {
    // Call the DescribeInstances API to retrieve information about instances
    const instanceDataResponse = await awsService.describeInstances().promise();

    // Extract each instance
    instanceDataResponse.Reservations.forEach(reservation => {
      result.push(...reservation.Instances);
    });
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

const fetchDynamoDbTables = async awsService => {
  const result = [];
  try {
    // Call the ListTables API to retrieve a list of table names
    const tableList = await awsService.listTables().promise();

    // Loop through each table name and describe the table
    for (const tableName of tableList.TableNames) {
      const tableDescription = await awsService
        .describeTable({ TableName: tableName })
        .promise();
      const table = tableDescription.Table;
      result.push(table);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

const fetchLambdas = async awsService => {
  const result = [];
  try {
    const lambdaFunctions = [];
    let nextMarker = null;

    // Fetch lambdas first by listing them
    do {
      const params = {
        Marker: nextMarker,
        MaxItems: 50,
      };

      const lambdaDataResponse = await awsService
        .listFunctions(params)
        .promise();

      console.log(lambdaDataResponse);
      lambdaFunctions.push(...lambdaDataResponse.Functions);

      nextMarker = result.NextMarker;
    } while (nextMarker);

    // Describe each lambda function for more detailed information
    for (const lambdaFunction of lambdaFunctions) {
      const detailedFunction = await awsService
        .getFunction({
          FunctionName: lambdaFunction.FunctionName,
        })
        .promise();
      result.push(detailedFunction);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

const fetchEcsResources = async awsService => {
  const result = [];

  try {
    // Call the listClusters API to retrieve a list of ECS cluster ARNs
    const clustersList = await awsService.listClusters().promise();

    const clustersDetails = await awsService
      .describeClusters({ clusters: clustersList.clusterArns })
      .promise();

    let clusters = clustersDetails.clusters;
    // Loop over the ECS clusters
    for (const cluster of clusters) {
      // Create first layer within the result object
      const clusterDetailedOverview = {
        ...cluster,
        Services: [],
      };

      // Fetch services within this cluster
      const servicesList = await awsService
        .listServices({ cluster: cluster.clusterArn })
        .promise();

      const servicesDetails = await awsService
        .describeServices({
          cluster: cluster.clusterArn,
          services: servicesList.serviceArns,
        })
        .promise();

      const services = servicesDetails.services;

      // Loop over each service within the cluster
      for (const service of services) {
        clusterDetailedOverview.Services.push({
          ...service,
          Tasks: [],
        });

        const tasksList = await awsService
          .listTasks({
            cluster: cluster.clusterArn,
            serviceName: service.serviceName,
          })
          .promise();

        if (service.runningCount > 0) {
          const tasksDetails = await awsService
            .describeTasks({
              cluster: cluster.clusterArn,
              tasks: tasksList.taskArns,
            })
            .promise();

          const tasks = tasksDetails.tasks;

          for (const task of tasks) {
            clusterDetailedOverview.Services[0].Tasks.push({ ...task });
          }
        }
      }
      result.push(clusterDetailedOverview);
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return result;
};

const fetchS3Buckets = async awsService => {
  const result = [];
  try {
    // Call the listBuckets API to retrieve a list of bucket names
    const bucketList = await awsService.listBuckets().promise();
    result.push(...bucketList.Buckets);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

const fetchRdsResources = async awsService => {
  const result = [];

  try {
    // Call the describeDBInstances API to retrieve information about standalone instances
    const instances = await awsService.describeDBInstances().promise();

    // Loop through each standalone instance
    for (const instance of instances.DBInstances) {
      console.log('here');
      result.push(instance);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

async function fetchAwsResources(awsRegion) {
  const ec2 = new AWS.EC2({ region: awsRegion });
  const dynamodb = new AWS.DynamoDB({ region: awsRegion });
  const rds = new AWS.RDS({ region: awsRegion });
  const lambda = new AWS.Lambda({ region: awsRegion });
  const ecs = new AWS.ECS({ region: awsRegion });
  const s3 = new AWS.S3({ region: awsRegion });

  const result = {
    vpc: await fetchVpcs(ec2),
    subnet: await fetchSubnets(ec2),
    ec2: await fetchEc2Instances(ec2),
    dynamodb: await fetchDynamoDbTables(dynamodb),
    lambda: await fetchLambdas(lambda),
    // ecs: await fetchEcsResources(ecs),
    s3: await fetchS3Buckets(s3),
    rds: await fetchRdsResources(rds),
  };

  // console.log(result);
  return result;
}

export { fetchAwsResources };
