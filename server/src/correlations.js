const createVpcObject = (vpc, subnets, lambdaFunctions, routeTables, ecs) => {
  const availabilityZones = () => {
    const zones = [];
    subnets.forEach(subnet => {
      if (!zones.includes(subnet.AvailabilityZone)) {
        zones.push(subnet.AvailabilityZone);
      }
    });
    return zones;
  };

  return {
    VpcId: vpc.VpcId,
    VpcArn: vpc.VpcArn,
    CidrBlock: vpc.CidrBlock,
    AvailabilityZones: availabilityZones(),
    RouteTables: routeTables,
    Tags: vpc.Tags,
    Subnets: subnets,
    InternetGateways: [],
    LambdaFunctions: lambdaFunctions,
    Ecs: ecs,
  };
};

const createSubnetObject = subnet => {
  let subnetName = '';
  subnet.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      subnetName = tag.Value;
    }
  });

  return {
    SubnetId: subnet.SubnetId,
    SubnetName: subnetName,
    SubnetType: subnet.SubnetType,
    SubnetGroup: subnet.SubnetGroup,
    AvailabilityZone: subnet.AvailabilityZone,
    CidrBlock: subnet.CidrBlock,
    Tags: subnet.Tags,
  };
};

const createEc2Object = ec2Instance => {
  let instanceName = '';
  ec2Instance.Tags.forEach(tag => {
    if (tag.Key === 'Name') {
      instanceName = tag.value;
    }
  });

  return {
    ImageId: ec2Instance.ImageId,
    InstanceId: ec2Instance.InstanceId,
    InstanceName: instanceName,
    InstanceType: ec2Instance.ImageId,
    AvailabilityZone: ec2Instance.Placement.AvailabilityZone,
    VpcId: ec2Instance.VpcId,
    SubnetId: ec2Instance.SubnetId,
    Architecture: ec2Instance.Architecture,
    Tags: ec2Instance.Tags,
  };
};

const createRouteTablesObject = routeTable => {
  return {
    RouteTableId: routeTable.RouteTableId,
    Routes: routeTable.Routes,
  };
};

const createRdsObject = rdsInstance => {
  const subnetIds = rdsInstance.DBSubnetGroup.Subnets.map(subnet => {
    return subnet.SubnetIdentifier;
  });

  return {
    DBIdentifier: rdsInstance.DBInstanceIdentifier,
    DBClusterIdentifier: rdsInstance.DBClusterIdentifier,
    DBSubnetGroupName: rdsInstance.DBSubnetGroup.DBSubnetGroupName,
    DBSubnetIds: subnetIds,
    DBSubnetGroup: rdsInstance.DBSubnetGroup,
    Endpoint: rdsInstance.Endpoint,
    Engine: rdsInstance.Engine,
    EngineVersion: rdsInstance.EngineVersion,
    AvailabilityZone: rdsInstance.AvailabilityZone,
    Tags: rdsInstance.Tags,
    MasterUsername: rdsInstance.MasterUsername,
  };
};

const createLambdaObject = functionInstance => {
  let result = {
    FunctionName: functionInstance.Configuration.FunctionName,
    FunctionArn: functionInstance.Configuration.FunctionArn,
    Runtime: functionInstance.Configuration.Runtime,
    Architecture: functionInstance.Configuration.Architecture,
    VpcId: '',
  };

  if (functionInstance.VpcConfig) {
    result.VpcId = functionInstance.VpcConfig.VpcId;
  }
  return result;
};

function determineCorrelations(resourcesList) {
  const result = {
    vpc: [],
    s3: [],
    dynamodb: [],
    rds: [],
    lambda: [],
  };

  /*
  ---------------------------------------------------------------------------
  VPC Related resources
  ---------------------------------------------------------------------------
  */
  for (const vpc of resourcesList.vpc) {
    const vpcId = vpc.VpcId;
    const vpcSubnets = [];
    const lambdaFunctions = [];
    const routeTables = [];
    const ecs = [];

    // Route tables
    for (const routeTable of resourcesList.routeTables) {
      routeTables.push(createRouteTablesObject(routeTable));
    }

    // Correlate subnets to vpc
    resourcesList.subnet.forEach(subnet => {
      const subnetEc2Instances = [];

      // Correlate EC2 instances to subnet
      resourcesList.ec2.forEach(ec2Instance => {
        if (subnet.SubnetId === ec2Instance.SubnetId) {
          subnetEc2Instances.push(createEc2Object(ec2Instance));
        }
      });

      // Correlate RDS resources to subnet
      const subnetRdsResources = [];
      resourcesList.rds.forEach(rdsResource => {
        const subnetIds = rdsResource.DBSubnetGroup.Subnets.map(
          subnet => subnet.SubnetIdentifier,
        );

        if (subnetIds.includes(subnet.SubnetId)) {
          subnetRdsResources.push(createRdsObject(rdsResource));
        }
      });

      // Correlate Lambda Function resources
      resourcesList.lambda.forEach(lambdaFunction => {
        if (lambdaFunction.VpcConfig) {
          if (lambdaFunction.VpcConfig.VpcId === vpcId) {
            lambdaFunctions.push(createLambdaObject(lambdaFunction));
          } else {
            console.debug('Lambda is potentially running in another vpc');
          }
        } else {
          console.debug('Lambda is not running inside a vpc');
        }
      });

      // ECS
      const subnetEcsInstances = [];
      for (const ecsCluster of resourcesList.ecs) {
        for (const service of ecsCluster.Services) {
          for (const task of service.Tasks) {
            let subnetId = '';
            let taskArn = task.taskArn;
            let taskName = taskArn.split('/')[1];
            for (const attachment of task.attachments) {
              for (const detail of attachment.details) {
                if (detail.name === 'subnetId') {
                  subnetId = detail.value;
                }
              }
            }

            subnetEcsInstances.push({
              ecsClusterName: ecsCluster.clusterArn.split('/')[1],
              serviceName: ecsCluster.serviceName,
              launchType: ecsCluster.launchType,
              taskName: taskName,
              taskArn: taskArn,
              subnetId: subnetId,
              availabilityZone: task.availabilityZone,
              cpu: task.cpu,
              tags: task.tags,
            });
          }
        }
      }

      // And finally we add the subnet with associated instances to the VPC.
      if (vpcId === subnet.VpcId) {
        const filteredSubnet = createSubnetObject(subnet);
        vpcSubnets.push({
          ...filteredSubnet,
          Ec2Instances: subnetEc2Instances,
          RdsInstances: subnetRdsResources,
          EcsInstances: subnetEcsInstances,
        });
      }
    }, []);

    result.vpc.push(
      createVpcObject(vpc, vpcSubnets, lambdaFunctions, routeTables, ecs),
    );
  }

  /*
  ---------------------------------------------------------------------------
  GLOBAL RESOURCES
  ---------------------------------------------------------------------------
  */
  result.s3.push(...resourcesList.s3);
  result.dynamodb.push(...resourcesList.dynamodb);

  // LambdaFunctions that are not running in a VPC
  const regionalLambdaFunctions = [];
  resourcesList.lambda.forEach(lambdaFunction => {
    if (!lambdaFunction.VpcConfig) {
      regionalLambdaFunctions.push(createLambdaObject(lambdaFunction));
    }
  });
  result.lambda.push(...regionalLambdaFunctions);

  return result;
}

export { determineCorrelations };
