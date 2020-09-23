import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import getUserRequest from '../api/Request';
import Activities from '../components/Activities';

interface CustomProps {
  state: {
    auth: {
      auth: boolean,
      authData: {
        id: string,
        lock_id: string,
        auth_token: string,
        name: string
      }
    },
    activity: {
      user: any,
      name: string
    }
  },
  loadOn: Function,
  loadOff: Function
}

interface State {
  listOfActivities: Array<object>,
  listOfReviews: Array<object>,
  start: string,
  end: string,
  display: string
}

interface Event {
  target: {
    name: string,
    value: string
  }
}

class ViewUserActivityComp extends Component <CustomProps, State, Event> {
  constructor(props: any) {
    super(props);
    const stateProps: State = {
      listOfActivities: [],
      listOfReviews: [],
      start: '',
      end: '',
      display: 'none'
    }

    this.state = stateProps;
  }

  dateFormatter = (dStart, dEnd) => {
    const dateSt = dStart.getFullYear()
      + '-' + (dStart.getMonth() + 1)
      + '-' + dStart.getDate();

    const dateEn = dEnd.getFullYear()
      + '-' + (dEnd.getMonth() + 1)
      + '-' + dEnd.getDate();

      return ({dateSt, dateEn});
  }

  handleSubmit = async(event: any) => {
    event.preventDefault();
    const state = this.props.state;
    const dStart = new Date(this.state.start);
    const dEnd = new Date(this.state.end);

    const dateForm = this.dateFormatter(dStart, dEnd);

    const params = {
      uri: 'workdoneDate',
      uriId: state.activity.user,
      authToken: state.auth.authData.auth_token,
      userId: state.auth.authData.id,
      body: dateForm.dateSt + '/' + dateForm.dateEn
    }

    this.props.loadOn();
    const requestResponse = await getUserRequest('get', params);
    this.props.loadOff();
    console.log(requestResponse.data.data);

    if (requestResponse.status === 200) {
        this.setState({
          listOfActivities: requestResponse.data.data.report,
          listOfReviews: requestResponse.data.data.review,
          display: 'block'
        });
      return;
    }

    return;
  }

  handleReviewSubmit = async(event: any, review: string) => {
    event.preventDefault();
    //return console.log('working');
    const state = this.props.state;
    const activities = this.state.listOfActivities.map((activity: any) => {
      return activity.id;
    });
    const dStart = new Date(this.state.start);
    const dEnd = new Date(this.state.end);

    const dateForm = this.dateFormatter(dStart, dEnd);

    const params = {
      uri: 'review',
      uriId: '',
      authToken: state.auth.authData.auth_token,
      userId: state.auth.authData.id,
      body: {
        user_id: state.activity.user,
        mgr_id: state.auth.authData.id,
        mgr_name: state.auth.authData.name,
        start_date: dateForm.dateSt,
        end_date: dateForm.dateEn,
        workdone_ids: activities.toString(),
        review: review.replace(/[./'"*+?^${}()|[\]\\]/g, '\\$&')
      }
    }

    this.props.loadOn();
    const requestResponse = await getUserRequest('post', params);
    this.props.loadOff();
    //console.log(requestResponse);

    if (requestResponse.status === 201) {
      this.setState({listOfReviews: requestResponse.data.data});
      return window.alert('Review submitted. \nScroll down to view.');
    }

    return window.alert('Not successful, please try again');
  }

  render() {
    const state = this.state;

    const StartInput = ({value, onClick}: any) => {
      return (
        <input
          type="text"
          placeholder="start date"
          value={value}
          onClick={onClick}
          style={{margin: '10px 10px 10px 0', padding: '7px'}}
          readOnly
        />
      )
    };

    const EndInput = ({value, onClick}: any) => {
      return (
        <input
          type="text"
          placeholder="end date"
          value={value}
          onClick={onClick}
          style={{margin: '10px 10px 10px 0', padding: '7px'}}
          readOnly
        />
      )
    };

    return (
      <div className="flex flex-col page fullWidth">
          <form
            className="flex flex-col"
            onSubmit={this.handleSubmit}
            style={{alignItems: 'flex-start', width: '70%'}}
          >
            <h3>{this.props.state.activity.name}</h3>
            <div>
              <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={this.state.start}
                onChange={(start: any) => this.setState({start: start})}
                customInput={<StartInput />}
                required
              />
              <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={this.state.end}
                onChange={(end: any) => this.setState({end: end})}
                customInput={<EndInput />}
                required
              />
              <input type="submit" value="Get activities" className="btn-bt" />
            </div>
          </form>
          <Activities
            listOfActivities={state.listOfActivities}
            listOfReviews={state.listOfReviews}
            display={state.display}
            handleReviewSubmit={this.handleReviewSubmit}
          />
      </div>
    );
  }
}

const ViewUserActivity = connect(mapStateToProps, mapDispatchToProps)(ViewUserActivityComp);
export default ViewUserActivity;
