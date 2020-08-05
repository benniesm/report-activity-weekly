import React, { Component } from 'react';
import Reports from '../components/Reports';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      listOfReports: [{'id': 1, 'name': 'Jane Doe'},{'id': 2, 'name': 'John Smith'}]
    }
  }

  render() {
    const state = this.state;

    return (
      <div className="flex flex-col">
        Dashboard
        <button className="btn-plain">
          Click to fill your blah blah blah
        </button>
        <Reports listOfReports={state.listOfReports} />
      </div>
    );
  }
}

export default Dashboard;
