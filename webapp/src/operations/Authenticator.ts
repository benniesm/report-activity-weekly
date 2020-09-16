import getUserRequest from '../api/Request';
interface auth {
  auth: boolean,
  authData: {
    id: string,
    auth_token: string
  }
};

const authenticator = async(auth: auth) => {
  // Get auth data from global state
  const authDataSet = () => {
    let authStatus = false;
    for (let key in auth.authData) {
      if (auth.authData.hasOwnProperty(key)) {
        authStatus = true;
      }
    }
    return authStatus;
  }

  // Confirm if auth data is set and auth is true
  if (! auth.auth || ! authDataSet) {
  console.log('noe auth data');
    return false;
  }

  // Attempt to request for the current user's profile
  const authData = auth.authData;
  const params = {
    uri: 'user',
    uriId: authData.id,
    authToken: authData.auth_token,
    userId: authData.id,
    body: ''
  }

  const requestResponse = await getUserRequest('get', params);
//console.log(requestResponse);

  // Server returns Unauthorized
  if (requestResponse.status > 400) {
    return false
  }

  // If request status is OK, go to the application.
  if (requestResponse.status === 200) {
    return true;
  }

  // Provide for unforseen circumstances or bugs
  window.alert('Application error!');
  return false;
}

export default authenticator;
