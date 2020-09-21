import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import { Redirect } from 'react-router-dom';
import authenticator from '../operations/Authenticator';
import '../App.css';
import Header from '../components/Header';
import Dashboard from '../pages/Dashboard';
import CreateReport from '../pages/CreateReport';
import ViewReport from '../pages/ViewReport';

class ContainerComp extends Component {
  constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        target: null
      }
      this.gState = props.state;
  }

  componentDidMount = async() => {
    //console.log(this.gState.loading);
    this.props.loadOn();
    const authenticate = await authenticator(this.gState.auth);
    this.props.loadOff();

    if (! authenticate) {
      return this.setState({redirect: true, target: '/login'});
    }
  }

  logout = () => {
    return this.setState({redirect: true, target: '/login'});
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.target} />
    }

    //console.log(this.gState.auth)
    return (
      <div className="flex flex-col page">
        <div className="flex" id="body">
          <Router>
            <Header
              deauth={this.props.deauthenticate}
              loadOn={this.props.loadOn}
              loadOff={this.props.loadOff}
              id={this.gState.auth.authData.id}
              logout={this.logout}
            />
            <Route path="/app" exact component={Dashboard} />
            <Route path="/create-report" exact component={CreateReport} />
            <Route path="/view-report" exact component={ViewReport} />
          </Router>
        </div>
        <div className="flex" id="footer">
          Bakertilly Nigeria
        </div>
      </div>
    );
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ContainerComp);
export default Container;
