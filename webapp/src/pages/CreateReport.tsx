import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import getUserRequest from '../api/Request';
import { Redirect } from 'react-router-dom';

interface CustomProps {
    state: {
      auth: {
        authData: {
          id: string,
          lock_id: string,
          auth_token: string
        }
      }
    }
}

interface State {
    redirect: boolean,
    target: string,
    activity: string,
    achievement: string,
    comments: string
}

interface Event {
  target: {
    name: string,
    value: string
  }
}

class CreateReportComp extends Component <CustomProps, State, Event> {
  constructor(props: any) {
    super(props);

    const stateProps: State = {
      redirect: false,
      target: '',
      activity: '',
      achievement: '',
      comments: ''
    }

    this.state = stateProps;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event: Event) => {
    this.setState({ [event.target.name]: event.target.value } as unknown as Pick<State, keyof State>);
  }

  handleSubmit = async(event: any) => {
    event.preventDefault();
    const params = {
      uri: 'workdone',
      uriId: '',
      authToken: this.props.state.auth.authData.auth_token,
      userId: this.props.state.auth.authData.id,
      body: JSON.stringify({
        lock_id: this.props.state.auth.authData.lock_id,
        activity: this.state.activity,
        achievement: this.state.achievement
      })
    }

    const requestResponse = await getUserRequest('post', params);

    if (requestResponse.status === 201) {
      window.alert('Your submission was successful');
      this.setState({redirect: true, target: '/app'});
      return;
    }

    window.alert('Not successful, please try again');
    return;
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.target} />
    }

    return (
      <div className="flex flex-col page">
        <>
        <div className="small-title">
          Record your activity and achievements below
        </div>
        <form className="flex flex-col dailyForms" onSubmit={this.handleSubmit}>
          <h5>Activities</h5>
          <textarea
            className="flex flex-col fullWidth"
            name="activity"
            value={this.state.activity}
            onChange={this.handleChange}
          />
          <h5>Achievements</h5>
          <textarea
            className="flex flex-col fullWidth"
            name="achievement"
            value={this.state.achievement}
            onChange={this.handleChange}
          />
          <br/>
          <span>Additional comments</span>
          <input
            type="text"
            name="comments"
            value={this.state.comments}
            onChange={this.handleChange}
            style={{margin: '10px', padding: '7px', width: '85%'}}
          />
        <input type="submit" value="Submit report" className="btn-bt" />
        </form>
        </>
      </div>
    );
  }
}

const CreateReport = connect(mapStateToProps, mapDispatchToProps)(CreateReportComp);
export default CreateReport;
