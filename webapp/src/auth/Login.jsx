import React, { Component } from 'react';
import getUserRequest from '../api/Request';
import '../App.css';

class Login extends Component {
  constructor () {
    super();

    this.state = {
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

  handleSubmit = (event) => {
    event.preventDefault();
  }

  componentDidMount = () => {
  }

  render() {

    return (
      <div className="flex flex-col" id="loginArea">
          <form className="flex flex-col" id="loginForm" onSubmit={this.handleSubmit}>
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
            <input type="hidden" id="device-token" defaultValue="356842584222" />
            <input type="hidden" id="coord-lat" defaultValue={this.state.userLat} />
            <input type="hidden" id="coord-lon" defaultValue={this.state.userLon} />
            <button
              className={"btn-black " + this.state.locButton}
              onClick={this.getLoginCredentials}
            >
              Record your current location to continue
            </button>
            <input
              type="submit"
              className={"btn-green " + this.state.loginButton}
              value="LOGIN"
            />
          </form>
      </div>
    );
  };
};

export default Login;
