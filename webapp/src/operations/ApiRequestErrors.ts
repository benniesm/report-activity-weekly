/*
* Function for processing network errors from requests
*/
interface Error {
  status: number
};

const errorMessage = (error: Error) => {
  switch (error.status) {
    case 400:
      return 'Your request is invalid.';
    case 401:
      return 'You are not authorized to access the resource.';
    case 404:
      return 'Requested resource not found.';
    case 405:
      return 'Your request is abnormal.';
    case 409:
      return 'Record already exists on the server.';
    case 422:
      return 'Missing parameters in your request.';
    case 500:
      return 'Internal server error, please contact admin.';
    case 502:
      return 'Connection error.\nCheck your internet and try again';
    case 503:
      return 'Service unavailable.';
    default:
      return 'Undefined error, please contact admin.';
  }
}

export default errorMessage;
