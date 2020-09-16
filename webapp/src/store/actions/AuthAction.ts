const authenticate = (authData: object) => {
  return {
    type: 'AUTHENTICATE',
    data: authData
  }
}

const deauthenticate = () => {
  return {
    type: 'DEAUTHENTICATE'
  }
}

export {authenticate, deauthenticate};
