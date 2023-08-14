import IResourceTag from './resource-tag';

export default interface IEc2Instance {
  ImageId: string;
  InstanceId: string;
  InstanceName: string;
  InstanceType: string;
  AvailabilityZone: Array<string>;
  VpcId: string;
  SubnetId: string;
  Architecture: string;
  Tags: Array<IResourceTag>;
}
