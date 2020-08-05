import React, { Component } from 'react';

class CreateReport extends Component {
  render() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const DailyReport = () => days.map(day => {
      return (
        <div className="flex flex-col dailyForms" key={day}>
          <div className="small-title">{day}</div>
          <div className="flex dailyFormsRow">
            <div className="flex flex-col fullWidth">
              <div>Activities</div>
              <textarea></textarea>
            </div>
            <div className="flex flex-col fullWidth">
              <div>Achievements</div>
              <textarea></textarea>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="flex flex-col page">
        <h5>Weekly Activity Report Form</h5>
        <DailyReport />
        <button className="btn-bt">
          Submit Report
        </button>
      </div>
    );
  }
}

export default CreateReport;
