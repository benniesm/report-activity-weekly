interface Action {
  type: string,
  data: any
}

const defaultState = {
  auth: false,
  authData: {}
}

const authReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        auth: true,
        authData: action.data
      };
    case 'DEAUTHENTICATE':
      return {
        auth: false,
        authData: {}
      }
    default:
      return state;
  }
}

export default authReducer;
