import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import { Redirect } from 'react-router-dom';
import authenticator from '../operations/Authenticator';

interface CustomProps {
  state: {
    auth: {
      auth: boolean,
      authData: {
        id: string,
        lock_id: string,
        auth_token: string
      }
    }
  }
}

interface State {
  redirect: boolean,
  target: string
}

class DefaultComp extends Component <CustomProps, State> {
  constructor (props: any) {
    super(props);
    const stateProps: State = {
      redirect: false,
      target: ''
    }

    this.state = stateProps;
  }

  authenticate = async(auth: any) => {
  console.log(auth);
    const authenticate = await authenticator(auth);
    if (! authenticate) {
      return this.setState({redirect: true, target: '/login'});
    }

    return this.setState({redirect: true, target: '/app'});
  }

  render () {
    const state = this.state;

    if (state.redirect) {
      return (
        <Redirect to={state.target} />
      );
    }

    return (
      <button onClick={() => this.authenticate(this.props.state.auth)} className="btn-plain">
        Click here to continue
      </button>
    )
  }
}

const Default = connect(mapStateToProps, mapDispatchToProps)(DefaultComp);
export default Default;
