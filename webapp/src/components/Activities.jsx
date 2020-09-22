import React, {useState} from 'react';
import Reviews from './Reviews';

const Activities = (props) => {
  
  const [review, setReview] = useState('');

  const ActivitiesIndex = () => props.listOfActivities.map(activity => {
    let time_in = new Date(activity.time_in);
    return (
      <div className="cardItem bGreen" key={activity.id}>
        <div className="cardItemTitle bGreen">
          {activity.activity}
        </div>
        <div className="cardItemInfo">
          {activity.achievement.split('\n').map((lineText) => {
            return <span key={lineText}>{lineText}<br/></span>
          })}
          <div>
            {
              activity.comments !== null && activity.comments !== '' ?
                <div><i><b>Comments:</b> {activity.comments}</i></div>
                :
                ''
            }
          </div>
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
      <ActivitiesIndex />
      <Reviews 
        listOfReviews={props.listOfReviews}
      />
      <form
        className="flex flex-col fullWidth"
        style={{paddingBottom: '50px', width: '70%', display: props.display}}
        onSubmit={e => props.handleReviewSubmit(e, review, setReview(''))}
      >
        <h3>Manager's Review:</h3>
        <textarea
          name="reviewText"
          value={review}
          onChange={e => setReview(e.target.value)}
          style={{margin: '10px 0 10px 0', padding: '7px'}}
          required
        />
        <input type="submit" value="Submit review" className="btn-bt" />
      </form>
    </div>
  );
}

export default Activities;
