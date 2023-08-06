import EC2 from 'aws-sdk/clients/ec2';
import errorMessages from '../../errors';
import successMessages from '../../success';

const listVpcs = async () => {
  const ec2 = new EC2({ region: 'eu-west-1' });
  const vpcData = await ec2.describeVpcs({}).promise();

  let result;
  if (vpcData.Vpcs === undefined) {
    result = errorMessages.AWSAuthError;
  }

  result = successMessages.GetSuccess;
  result.body = vpcData.Vpcs;
  return result;
};

export default listVpcs;
