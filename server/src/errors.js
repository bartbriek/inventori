const validRegions = {
  'Supported regions': ['us-east-1', 'eu-west-1', 'eu-central-1'],
};

const errorMessages = {
  AWSAuthError: { statusCode: 401, status: 'FAILURE', body: 'UNAUTHORIZED' },
  PutFailureRegions: { statusCode: 403, status: 'FAILURE', body: validRegions },
};

const createAuthErrorResponse = body => {
  const result = errorMessages.AWSAuthError;
  if (body) {
    result.body = body;
  }
  return result;
};

export default errorMessages;
export { createAuthErrorResponse };
