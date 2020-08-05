import React, { Component } from 'react';
import '../App.css';

class Login extends Component {
  render() {


    return (
        <div className="flex" id="loginForm">
          <h3>Login to continue</h3>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input readOnly type="text" id="id-address" value="5" />
          <input type="text" id="mac-address" />
          <input type="text" id="coord-lat" />
          <input type="text" id="coord-lon" />
          <button className="btn-green">
            LOGIN
          </button>
        </div>
    );
  }
}

export default Login;
