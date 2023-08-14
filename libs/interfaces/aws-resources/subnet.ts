import IResourceTag from './resource-tag';

export default interface ISubnet {
  resourceName: string;
  resourceType: string;
  subnetId: string;
  subnetType: string;
  subnetGroup: Array<string>;
  availabilityZone: string;
  cidrBlock: string;
  tags: Array<IResourceTag>;
}
