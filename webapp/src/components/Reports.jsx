import React from 'react';

const Reports = (props) => {
  const ReportsIndex = () => props.listOfReports.map(report => {
    return (
        <tr key={report.id}>
          <td>{report.activity}</td>
          <td>{report.achievement}</td>
          <td>{report.time_in}</td>
        </tr>
    );
  });

  return (
    <div className="flex indexArea">
    <table>
      <thead>
        <tr>
          <th>Activity</th>
          <th>Achievements</th>
          <th>Time logged</th>
        </tr>
      </thead>
      <tbody>
        <ReportsIndex />
      </tbody>
    </table>
    </div>
  );
}

export default Reports;
