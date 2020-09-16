import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';

class ReviewReportComp extends Component {
  constructor () {
    super();
    this.state = {
      review: ''
    };
  }
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
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="review"
            value={this.state.review}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit review" />
        </form>
      </div>
    );
  }
}

const ReviewReport = connect(mapStateToProps, mapDispatchToProps)(ReviewReportComp);
export default ReviewReport;
