import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import getUserRequest from '../api/Request';
import Reports from '../components/Reports';

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
  }
}

interface State {
  listOfReports: Array<object>
}

interface Response {
  status: number,
  data: object
}

class DashboardComp extends Component <CustomProps, State, Response> {
  constructor(props: any) {
    super(props);
    const stateProps: State = {
      listOfReports: []
    }

    this.state = stateProps;
  }

  getReports = async(sProps: any) => {
    const authData = sProps.state.auth.authData;
    const params = {
      uri: 'workdone',
      uriId: '',
      authToken: authData.auth_token,
      userId: authData.id,
      body: ''
    }

    const requestResponse = await getUserRequest('get', params);
//console.log(requestResponse);
    if (requestResponse.status === 200) {
      if (requestResponse.data.data.length > 0
        && requestResponse.data.data[0].hasOwnProperty('activity')) {
          this.setState({listOfReports: requestResponse.data.data});
      }
      return;
    }

    return;
  }

  componentDidMount = () => {
    const sProps: CustomProps = this.props;
    this.getReports(sProps);
  }

  render() {
    const state = this.state;

    return (
      <div className="flex flex-col fullWidth">
        <h2>Dashboard</h2>
        <Reports listOfReports={state.listOfReports} />
      </div>
    );
  }
}
const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComp);
export default Dashboard;
