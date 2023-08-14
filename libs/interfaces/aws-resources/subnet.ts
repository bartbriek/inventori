import IResourceTag from './resource-tag';

export default interface ISubnet {
  SubnetId: string;
  SubnetName: string;
  SubnetType: string;
  SubnetGroup: Array<string>;
  AvailabilityZone: string;
  CidrBlock: string;
  Tags: Array<IResourceTag>;
}
