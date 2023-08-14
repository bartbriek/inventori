export default interface IEcsInstance {
  resourceName: string;
  resourceType: string;
  ecsClusterName: string;
  serviceName: string;
  launchType: string;
  taskName: string;
  taskArn: string;
  subnetId: string;
  availabilityZone: string;
  cpu: string;
  tags: Array<string>;
}
