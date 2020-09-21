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
  },
  loadOn: Function,
  loadOff: Function
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

  authenticate = async(props: any) => {
    props.loadOn();
    console.log(props);
    const authenticate = await authenticator(props.state.auth);
    if (! authenticate) {
      props.loadOff();
      console.log(props.state.loading);
      return this.setState({redirect: true, target: '/login'});
    }

    props.loadOff();
    console.log(props.state.loading);
    return this.setState({redirect: true, target: '/app'});
  }

  componentDidMount = () => {
    this.props.loadOff();
  }

  render() {
    const state = this.state;

    if (state.redirect) {
      return (
        <Redirect to={state.target} />
      );
    }

    return (
      <button onClick={() => this.authenticate(this.props)} className="btn-plain">
        Click here to continue
      </button>
    )
  }
}

const Default = connect(mapStateToProps, mapDispatchToProps)(DefaultComp);
export default Default;
