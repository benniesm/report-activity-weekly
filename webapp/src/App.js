import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store/Store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Default from './pages/Default';
import Login from './auth/Login';
import Register from './auth/Register';
import Container from './layout/Container';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="flex" id="main">
          <Router>
            <Route path="/" exact component={Default} />
            <Route path="/app" exact component={Container} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
