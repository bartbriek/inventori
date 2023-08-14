import IEc2Instance from './aws-resources/ec2-instance';
import IEcsInstance from './aws-resources/ecs-instance';
import IRdsInstance from './aws-resources/rds-instance';
import ILambdaFunction from './aws-resources/lambda-function';
import IDynamodbTable from './aws-resources/dynamodb-table';
import IVpc from './aws-resources/vpc';
import ISubnet from './aws-resources/subnet';
import IVpcEndpoint from './aws-resources/vpc-endpoint';
import ISecurityGroup from './aws-resources/security-group';
import IInternetGateway from './aws-resources/internet-gateway';
import IRouteTable from './aws-resources/route-table';
import IS3Bucket from './aws-resources/s3bucket';

/*
  Interface for Prop attribute in React Components used 
  within resources screen within Inventori.
*/
export default interface IResource {
  // Base attributes
  resourceName: string;
  resourceType: string;

  // Compute instances
  ec2?: IEc2Instance;
  ecs?: IEcsInstance;
  lambda?: ILambdaFunction;

  // Data storage resources
  rds?: IRdsInstance;
  dynamoDb?: IDynamodbTable;
  s3Bucket?: IS3Bucket;

  // Network resources
  vpc?: IVpc;
  vpcEndpoint?: IVpcEndpoint;
  internetGateway?: IInternetGateway;
  routeTable?: IRouteTable;
  subnet?: ISubnet;
  availabilityZone?: string;
  securityGroup?: ISecurityGroup;

  // custom attributes
  imageSrc: string;
}
