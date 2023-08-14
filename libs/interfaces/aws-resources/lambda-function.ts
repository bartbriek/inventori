import IResourceTag from './resource-tag';

export default interface ILambdaFunction {
  FunctionName: string;
  FunctionArn: string;
  Runtime: string;
  Tags: Array<IResourceTag>;
  Architecture: string;
  VpcId?: string;
}
