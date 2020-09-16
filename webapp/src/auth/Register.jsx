import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import getUserRequest from '../api/Request';
import errorMessage from '../operations/ApiRequestErrors';
import '../App.css';

class Register extends Component {
  constructor () {
    super();

    this.state = {
      redirect: false,
      target: null,
      name: '',
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    const params = {
      uri: 'register',
      uriId: null,
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }

    const requestResponse = await getUserRequest('post', params);

    if (requestResponse.status > 299) {
      const errMsg = errorMessage(requestResponse);
      return window.alert(errMsg);
    }

    if (requestResponse.status === 201) {
      window.alert('Registration successful!');
      return this.setState({
        name: '',
        email: '',
        password: '',
        redirect: true,
        target: './login'
      });
    }

    return window.alert('Unsuccessful, please try again');
  }

  goToLogin = () => {
    this.setState({redirect: true, target: './login'});
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.target} />
    }

    return (
      <div className="flex flex-col" id="loginArea">
          <form className="flex flex-col" id="loginForm" onSubmit={this.handleSubmit}>
            <h3>Activity Portal</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={this.handleChange}
              value={this.state.name}
              autoComplete="name"
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
              autoComplete="username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              autoComplete="current-password"
              required
            />
            <input
              type="submit"
              className={"btn-green"}
              value="REGISTER"
              style={{width: 'auto'}}
            />
            <div
              className={this.state.loginButton}
              onClick={this.goToLogin}
              style={{marginTop: '25px', cursor: 'pointer'}}
            >
              <u>Click here to login</u>
            </div>
          </form>
      </div>
    );
  };
};

export default Register;
