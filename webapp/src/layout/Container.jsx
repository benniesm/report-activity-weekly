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
    console.log(this.gState.auth);
    const authenticate = await authenticator(this.gState.auth);

    if (! authenticate) {
      return this.setState({redirect: true, target: '/login'});
    }
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.target} />
    }

    return (
      <div className="flex flex-col page">
        <div className="flex" id="body">
          <Router>
            <Header props={{deauthenticate: () => this.props.deauthenticate()}} />
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
