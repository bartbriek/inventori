import IResourceTag from './resource-tag';

export default interface ILambdaFunction {
  resourceName: string;
  resourceType: string;
  functionArn: string;
  runtime: string;
  tags: Array<IResourceTag>;
  architecture: string;
  vpcId?: string;
}
