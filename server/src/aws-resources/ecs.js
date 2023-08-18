import AWS from 'aws-sdk';

async function fetchEcsResources(region) {
  const result = [];

  try {
    const ecs = new AWS.ECS({ region: region });
    // Call the listClusters API to retrieve a list of ECS cluster ARNs
    const clustersList = await ecs.listClusters().promise();

    const clustersDetails = await ecs
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
      const servicesList = await ecs
        .listServices({ cluster: cluster.clusterArn })
        .promise();

      const servicesDetails = await ecs
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

        const tasksList = await ecs
          .listTasks({
            cluster: cluster.clusterArn,
            serviceName: service.serviceName,
          })
          .promise();

        if (service.runningCount > 0) {
          const tasksDetails = await ecs
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
}

export default fetchEcsResources;
