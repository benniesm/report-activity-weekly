import React from 'react';

const Reports = (props) => {
  const ReportsIndex = () => props.listOfReports.map(report => {
    let time_in = new Date(report.time_in)
    return (
      <div className="cardItem" key={report.id}>
        <div className="cardItemTitle">
          {report.activity}
        </div>
        <div className="cardItemInfo">
          {report.achievement.split('\n').map((lineText) => {
            return <span key={lineText}>{lineText}<br/></span>
          })}
          <div>
            {
              report.comments !== null && report.comments !== '' ?
                <div><i><b>Comments:</b> {report.comments}</i></div>
                :
                ''
            }
          </div>
          <div className="cardItemTime">
            {time_in.getHours() + ':' + time_in.getMinutes()}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col indexArea">
      <ReportsIndex />
    </div>
  );
}

export default Reports;
