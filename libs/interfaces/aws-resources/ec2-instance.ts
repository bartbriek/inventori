import IResourceTag from './resource-tag';

export default interface IEc2Instance {
  resourceName: string;
  resourceType: string;
  imageId: string;
  instanceId: string;
  instanceType: string;
  availabilityZone: Array<string>;
  vpcId: string;
  subnetId: string;
  architecture: string;
  tags: Array<IResourceTag>;
}
