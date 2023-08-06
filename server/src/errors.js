const errorMessages = {
  AWSAuthError: { statusCode: 401, status: 'FAILURE', body: 'UNAUTHORIZED' },
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
