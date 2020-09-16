import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';

class ViewReportComp extends Component {
  render = () => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Activity</td>
              <td>Activity</td>
            </tr>
            <tr>
              <td>Achievements</td>
              <td>Activity</td>
            </tr>
            <tr>
              <td>Additional comments</td>
              <td>Activity</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>Activity</td>
            </tr>
            <tr>
              <td>Review</td>
              <td>Activity</td>
            </tr>
            <tr>
              <td>Review Time</td>
              <td>Activity</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button>
            Add review
          </button>
        </div>
      </div>
    );
  }
}

const ViewReport = connect(mapStateToProps, mapDispatchToProps)(ViewReportComp);
export default ViewReport;
