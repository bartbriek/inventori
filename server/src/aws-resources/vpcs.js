import AWS from 'aws-sdk';

async function fetchVpcs(awsRegion) {
  const result = [];
  try {
    // Fetch VPCS
    const ec2 = new AWS.EC2({ region: awsRegion });
    const vpcDataResponse = await ec2.describeVpcs().promise();
    result.push(...vpcDataResponse.Vpcs);

    // Fetch Availability zones in one time
    const availabilityZonesData = await ec2
      .describeAvailabilityZones()
      .promise();

    const availabilityZones = () => {
      const zones = [];
      availabilityZonesData.AvailabilityZones?.forEach(zone => {
        if (!zones.includes(zone.ZoneName)) {
          zones.push(zone.ZoneName);
        }
      });
      console.log(zones);
      return zones;
    };

    result.forEach(vpc => {
      vpc.AvailabilityZones = availabilityZones();
    });
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

export default fetchVpcs;
