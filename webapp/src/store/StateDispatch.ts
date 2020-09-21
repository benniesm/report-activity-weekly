import {authenticate, deauthenticate} from './actions/AuthAction';
import {loadOn, loadOff} from './actions/LoadingAction';

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
    }
  }
}

export { mapStateToProps, mapDispatchToProps };
