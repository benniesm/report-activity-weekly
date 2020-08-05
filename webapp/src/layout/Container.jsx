import React, { Component } from 'react';
import '../App.css';
import Dashboard from '../pages/Dashboard';
import CreateReport from '../pages/CreateReport';

class Container extends Component {
  render() {
    return (
      <div className="flex flex-col page">
        <div className="flex" id="header">
          Header
        </div>
          <div className="flex" id="body">
            <CreateReport />
          </div>
        <div className="flex" id="footer">
          Bakertilly Nigeria
        </div>
      </div>
    );
  }
}

export default Container;
