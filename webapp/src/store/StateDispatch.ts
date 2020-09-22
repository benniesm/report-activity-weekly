import {authenticate, deauthenticate} from './actions/AuthAction';
import {loadOn, loadOff} from './actions/LoadingAction';
import {setUser} from './actions/ActivityAction';

const mapStateToProps = (state: any) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    authenticate: (data: any) => {
      dispatch(authenticate(data))
    },
    deauthenticate: () => {
      dispatch(deauthenticate())
    },
    loadOn: () => {
      dispatch(loadOn())
    },
    loadOff: () => {
      dispatch(loadOff())
    },
    setUser: (user: any, name: string) => {
      dispatch(setUser(user, name))
    }
  }
}

export { mapStateToProps, mapDispatchToProps };
