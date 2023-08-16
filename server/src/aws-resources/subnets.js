import AWS from 'aws-sdk';

async function fetchSubnets(awsRegion) {
  const result = [];
  try {
    const ec2 = new AWS.EC2({ region: awsRegion });
    const response = await ec2.describeSubnets().promise();

    // Create response object for Frontend
    response.Subnets.map(subnet => {
      result.push({
        subnetArn: subnet.SubnetArn,
        subnetId: subnet.SubnetId,
        availabilityZone: subnet.AvailabilityZone,
        subnetCidrBlock: subnet.CidrBlock,
        vpcId: subnet.VpcId,
        tags: subnet.Tags,
      });
    });
  } catch (error) {
    console.error('Error', error);
  }
  return result;
}

export default fetchSubnets;
