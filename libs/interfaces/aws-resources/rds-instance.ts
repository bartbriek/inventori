import IResourceTag from './resource-tag';

export default interface IRdsInstance {
  resourceName: string;
  resourceType: string;
  clusterName: string;
  dbSubnetIds: Array<string>;
  dbSubnetGroup: Array<string>;
  availabilityZone: string;
  endpoint: string;
  port: number;
  engine: string;
  engineVersion: string;
  masterUsername: string;
  tags: Array<IResourceTag>;
}
