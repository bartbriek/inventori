import { createAuthErrorResponse } from './common/errors.js';
import { createAuthorizedResponse } from './common/success.js';

function validateSession(accessKey, secretKey, sessionToken) {
  let result;
  if (accessKey !== 'dummy' && secretKey !== 'dummy') {
    result = createAuthorizedResponse();
  } else {
    result = createAuthErrorResponse();
  }
  return result;
}

export { validateSession };
