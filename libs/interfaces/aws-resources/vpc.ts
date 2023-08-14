import IRouteTable from './route-table';
import IResourceTag from './resource-tag';
import ISubnet from './subnet';
import ILambdaFunction from './lambda-function';
import IEcsInstance from './ecs-instance';

export default interface IVpc {
  resourceName: string;
  resourceType: string;
  vpcId: string;
  vpcArn: string;
  cidrBlock: string;
  availabilityZones: Array<string>;
  routeTables: Array<IRouteTable>;
  tags: Array<IResourceTag>;
  subnets: Array<ISubnet>;
  internetGateways: [];
  lambdaFunctions: Array<ILambdaFunction>;
  ecs: Array<IEcsInstance>;
}
