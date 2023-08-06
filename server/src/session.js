import { createAuthErrorResponse } from './errors.js';
import { createAuthorizedResponse } from './success.js';

function validateSession(accessKey, secretKey, sessionToken) {
  let result;
  if (accessKey !== 'dummy' && secretKey !== 'dummy') {
    result = createAuthorizedResponse();
  } else {
    result = createAuthErrorResponse();
  }
  return result;
}

export default validateSession;
