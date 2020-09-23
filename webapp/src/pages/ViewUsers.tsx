import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/StateDispatch';
import { Redirect } from 'react-router-dom';
import getUserRequest from '../api/Request';
import Users from '../components/Users';

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
  loadOff: Function,
  setUser: Function
}

interface State {
  listOfUsers: Array<object>,
  redirect: boolean,
  target: string
}

class ViewUsersComp extends Component <CustomProps, State> {
  constructor(props: any) {
    super(props);
    const stateProps: State = {
      listOfUsers: [],
      redirect: false,
      target: ''
    }

    this.state = stateProps;
  }

  getUsers = async(sProps: any) => {
    const authData = sProps.state.auth.authData;
    const params = {
      uri: 'user',
      uriId: '',
      authToken: authData.auth_token,
      userId: authData.id,
      body: ''
    }

    this.props.loadOn();
    const requestResponse = await getUserRequest('get', params);
    this.props.loadOff();
    //console.log(requestResponse);

    if (requestResponse.status === 200) {
      if (requestResponse.data.data.length > 0
        && requestResponse.data.data[0].hasOwnProperty('name')) {
          this.setState({listOfUsers: requestResponse.data.data});
      }
      return;
    }

    return;
  }

  viewActivity = (id: any, name: string) => {
    this.props.setUser(id, name);
    this.setState({redirect: true, target: '/view-user-activity'});
  }

  componentDidMount = () => {
    const sProps: CustomProps = this.props;
     this.getUsers(sProps);
  }

  render() {
    const state = this.state;

    if (state.redirect) {
        return <Redirect to={state.target} />
    }

    return (
      <div className="flex flex-col page fullWidth">
        <Users
          listOfUsers={state.listOfUsers}
          viewActivity={this.viewActivity}
        />
      </div>
    );
  }
}

const ViewUsers = connect(mapStateToProps, mapDispatchToProps)(ViewUsersComp);
export default ViewUsers;
