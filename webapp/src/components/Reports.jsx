import React from 'react';

const Reports = (props) => {
  const ReportsIndex = () => props.listOfReports.map(report => {
    return (
        <tr key={report.id}>
          <td>{report.id}</td>
          <td>{report.name}</td>
        </tr>
    );
  });

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
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
