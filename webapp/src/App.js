import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store/StateDispatch';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Loading from './components/Loading';
import Default from './pages/Default';
import Login from './auth/Login';
import Register from './auth/Register';
import Container from './layout/Container';

const AppComp = (props) => {
  //console.log(props.state.loading.load);
  return (
    <div className="flex" id="main">
      {        
        props.state.loading.load ? <Loading /> : null
      }
      <Router>
        <Route path="/" exact component={Default} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/app" exact component={Container} />
        <Route path="/create-report" exact component={Container} />
        <Route path="/view-report" exact component={Container} />
      </Router>
    </div>
  )
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComp);
export default App;
