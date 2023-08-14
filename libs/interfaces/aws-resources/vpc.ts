import IRouteTable from './route-table';
import IResourceTag from './resource-tag';
import ISubnet from './subnet';
import ILambdaFunction from './lambda-function';
import IEcsInstance from './ecs-instance';

export default interface IVpc {
  VpcId: string;
  VpcArn: string;
  CidrBlock: string;
  AvailabilityZones: Array<string>;
  RouteTables: Array<IRouteTable>;
  Tags: Array<IResourceTag>;
  Subnets: Array<ISubnet>;
  InternetGateways: [];
  LambdaFunctions: Array<ILambdaFunction>;
  Ecs: Array<IEcsInstance>;
}
