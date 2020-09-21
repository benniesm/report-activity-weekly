import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import getUserRequest from '../api/Request';

interface CustomProps {
  state: {
    auth: {
      auth: boolean,
      authData: {
        id: string,
        lock_id: string,
        auth_token: string
      }
    }
  },
  loadOn: Function,
  loadOff: Function
}

interface State {
  listOfActivities: Array<object>
}

class ViewUserActivityComp extends Component <CustomProps, State> {
  constructor(props: any) {
    super(props);
    const stateProps: State = {
      listOfActivities: []
    }

    this.state = stateProps;
  }

  getActivities = async(sProps: any) => {
    const authData = sProps.state.auth.authData;
    const params = {
      uri: 'workdone/date',
      uriId: '',
      authToken: authData.auth_token,
      userId: authData.id,
      body: 'user=user&start=start&end=end'
    }

    this.props.loadOn();
    const requestResponse = await getUserRequest('get', params);
    this.props.loadOff();
    //console.log(requestResponse);

    if (requestResponse.status === 200) {
      if (requestResponse.data.data.length > 0
        && requestResponse.data.data[0].hasOwnProperty('activity')) {
          this.setState({listOfActivities: requestResponse.data.data});
      }
      return;
    }

    return;
  }

  componentDidMount = () => {
    const sProps: CustomProps = this.props;
     this.getActivities(sProps);
  }

  render() {
    const state = this.state;

    return (
      <div className="flex flex-col fullWidth">
        {
            //<Users listOfActivities={state.listOfActivities} />
        }
      </div>
    );
  }
}

const ViewUserActivity = connect(mapStateToProps, mapDispatchToProps)(ViewUserActivityComp);
export default ViewUserActivity;
