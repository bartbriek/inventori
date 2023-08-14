import IResourceTag from './resource-tag';

export default interface IRdsInstance {
  Name: string;
  ClusterName: string;
  DBSubnetIds: Array<string>;
  DBSubnetGroup: Array<string>;
  AvailabilityZone: string;
  Endpoint: string;
  Port: number;
  Engine: string;
  EngineVersion: string;
  MasterUsername: string;
  Tags: Array<IResourceTag>;
}
