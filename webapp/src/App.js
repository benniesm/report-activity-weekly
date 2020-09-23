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
  //.log(props.state.loading.frame);
  return  (
    <div className="flex" id="main">
      {        
        props.state.loading.load ? <Loading /> : null
      }
      <div className={props.state.loading.frame + ' flex flex-col fullWidth'}>
        <Router>
          <Route path="/" exact component={Default} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/app" exact component={Container} />
          <Route path="/create-report" exact component={Container} />
          <Route path="/view-users" exact component={Container} />
          <Route path="/view-user-activity" exact component={Container} />
        </Router>
      </div>
    </div>
  )
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComp);
export default App;
