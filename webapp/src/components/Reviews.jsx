import React from 'react';

const Reviews = (props) => {
  const ReviewsIndex = () => props.listOfReviews.map(activity => {
    let time_in = new Date(activity.created_at);
    return (
      <div className="cardItem bBlue" key={activity.id}>
        <div className="cardItemTitle bBlue">
          <i>Review by: </i>{activity.mgr_name}
        </div>
        <div className="cardItemInfo">
          {activity.review.split('\n').map((lineText) => {
            return <span key={lineText}>{lineText}<br/></span>
          })}
          <div className="cardItemTime">
            {
              time_in.getDate()
              + '-' + (time_in.getMonth() + 1)
              + '-' + time_in.getFullYear()
              + ' ' + time_in.getHours()
              + ':' + time_in.getMinutes()
            }
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col indexArea">
      <ReviewsIndex />
    </div>
  );
}

export default Reviews;