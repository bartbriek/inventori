import ISubnet from './subnet';
import IEc2Instance from './ec2-instance';

export default interface IAvailabilityZone {
  resourceName: string;
  resourceType: string;
  subnets: Array<ISubnet>;
  ec2Instances: Array<IEc2Instance>;
}
