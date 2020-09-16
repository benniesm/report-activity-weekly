import React from 'react';
import { Link } from "react-router-dom";

const logout = (deauthenticate) => {
  const confirmLogout = window.confirm('Do you want to log out?');
  if (confirmLogout) {
    deauthenticate();
  }

  return;
}

const Header = (props) => {
  return(
    <div className="flex" id="header">
      <h4>Header</h4>
      <div className="flex" id="navBar">
        <Link to="/app" className="flex links" >Dashboard</Link>
        <Link to="/create-report" className="flex links" >Create Activity Report</Link>
        <Link to="/view-report" className="flex links" >View Report</Link>
      </div>
      <button className="btn-orange" onClick={() => logout(props.deauthenticate)}>
        Log out
      </button>
    </div>
  );
}

export default Header;
