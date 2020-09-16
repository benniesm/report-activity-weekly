import {authenticate, deauthenticate} from './actions/AuthAction';

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
    }
  }
}

export { mapStateToProps, mapDispatchToProps };
