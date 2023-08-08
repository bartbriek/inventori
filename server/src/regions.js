import { errorMessages } from './common/errors.js';

const regions = ['us-east-1', 'eu-west-1', 'eu-central-1'];

function isValidRegion(request, response) {
  const regionId = request.params.regionId;
  let result = false;

  if (!regions.includes(regionId)) {
    response.status(errorMessages.PutFailureRegions.statusCode);
    response.send(errorMessages.PutFailureRegions);
  }

  return result;
}

export { isValidRegion };
