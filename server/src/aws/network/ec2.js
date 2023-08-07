import EC2 from 'aws-sdk/clients/ec2';
import errorMessages from '../../errors';
import successMessages from '../../success';

const listEc2Instances = async vpcId => {
  const ec2 = new EC2({ region: 'eu-west-1' });
  const ec2Data = await ec2
    .describeInstances({ Filters: [{ Name: 'vpc-id', Values: [vpcId] }] })
    .promise();

  let result;
  if (ec2Data.Vpcs === undefined) {
    result = errorMessages.AWSAuthError;
  }

  result = successMessages.GetSuccess;
  result.body = ec2Data.Vpcs;
  return result;
};

export default listEc2Instances;
