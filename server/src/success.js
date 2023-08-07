const successMessages = {
  Authorized: { statusCode: 200, status: 'SUCCESS', body: 'AUTHORIZED' },
  CreatedSuccess: { statusCode: 201, status: 'SUCCESS', body: {} },
  GetSuccess: { statusCode: 200, status: 'SUCCESS', body: {} },
  PutSuccess: { statusCode: 200, status: 'SUCCESS', body: {} },
};

const createGetResponse = body => {
  const result = successMessages.GetSuccess;
  result.body = body;
  return result;
};

const createAuthorizedResponse = () => {
  return successMessages.Authorized;
};

export default successMessages;
export { createGetResponse, createAuthorizedResponse };
