import React from 'react';
import { Link } from "react-router-dom";
import getUserRequest from '../api/Request';

const logout = async(props) => {
  //console.log(props);
  const confirmLogout = window.confirm('Do you want to log out?');

  if (confirmLogout) {
    props.loadOn();
    const params = {
      uri: 'logout',
      uriId: props.id,
      body: {}
    }

    await getUserRequest('post', params);
    //console.log(requestResponse);
    props.deauth();
    props.logout();
    props.loadOff();
  }

  return;
}

const Header = (props) => {
  //console.log(props);
  return(
    <div className="flex" id="header">
      <img src="/logo.jpg" alt="logo" height="40px" width="35px" />
      <div className="flex" id="navBar">
        <Link to="/app" className="flex links" >Dashboard</Link>
        <Link to="/create-report" className="flex links" >Create Activity Report</Link>
        <Link to="/view-users" className="flex links" >View Staff Activities</Link>
      </div>
      <button className="btn-orange" onClick={() => logout(props)}>
        Log out
      </button>
    </div>
  );
}

export default Header;
