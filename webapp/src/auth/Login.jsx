import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import { Redirect } from 'react-router-dom';
import getUserRequest from '../api/Request';
import errorMessage from '../operations/ApiRequestErrors';
import '../App.css';

class LoginComp extends Component {
  constructor () {
    super();

    this.state = {
      redirect: false,
      target: null,
      email: '',
      password: '',
      userLat: '',
      useLon: '',
      loginButton: 'hidden-el',
      locButton: 'revealed-el',

    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLoginCredentials = () => {
    const showPosition = position => {
      this.setState({
        userLat: position.coords.latitude,
        userLon: position.coords.longitude,
        locButton: 'hidden-el',
        loginButton: 'revealed-el'
      });
    }

    const manageErrors = (error) => {
      const errorMsg = 'You must allow access to your location to continue.';
      const errorMsg2 = 'Please refresh your page to try again.';

      switch (error.code) {
        case error.PERMISSION_DENIED:
          window.alert(errorMsg);
          break;
        case error.POSITION_UNAVAILABLE:
          window.alert(errorMsg2)
          break;
        case error.TIMEOUT:
          window.alert(errorMsg2);
          break;
        case error.UNKNOWN_ERROR:
          window.alert(errorMsg2);
          break;
        default:
          window.alert(errorMsg2);
      };
    }

    navigator.geolocation.getCurrentPosition(showPosition, manageErrors);
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    const authData = this.props.state.authData;
    const params = {
      uri: 'login',
      uriId: '',
      body: {
        email: this.state.email,
        password: this.state.password,
        lat: this.state.userLat,
        lon: this.state.userLon,
        lock_id: authData ? authData.lock_id: null
      }
    }

    const requestResponse = await getUserRequest('post', params);

    if (requestResponse.status > 299) {
      const errMsg = errorMessage(requestResponse);
      return window.alert(errMsg);
    }

    if (requestResponse.status === 200) {
      //console.log(requestResponse.data.data)
      this.props.authenticate(requestResponse.data.data);
      window.alert('Login successful!');
      return this.setState({
        name: '',
        password: '',
        redirect: true,
        target: './app'
      });
    }

    return window.alert('Unsuccessful, please try again');
  }

  goToRegister = () => {
    this.setState({redirect: true, target: '/register'});
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.target} />
    }

    return (
      <div className="flex flex-col" id="loginForm">
          <form
            className="flex flex-col"
            style={{width: '100%'}}
            onSubmit={this.handleSubmit}
          >
            <h3>Activity Portal</h3>
            <input
              className={this.state.loginButton}
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
              autoComplete="username"
            />
            <input
              className={this.state.loginButton}
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              autoComplete="current-password"
            />
            <input
              type="submit"
              className={"btn-green " + this.state.loginButton}
              value="LOGIN"
              style={{width: 'auto'}}
            />
            <div
              className={this.state.loginButton}
              onClick={this.goToRegister}
              style={{marginTop: '25px', cursor: 'pointer'}}
            >
              <u>Click here to register</u>
            </div>
          </form>
          <button
            className={"btn-plain " + this.state.locButton}
            onClick={this.getLoginCredentials}
          >
            Record your current location to continue
          </button>
      </div>
    );
  };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComp);
export default Login;
