import React from 'react';

const Users = (props) => {
  const UsersIndex = () => props.listOfUsers.map(user => {
    let last_login = new Date(user.updated_at);
    
    return (
      <div
      className="cardItem clickDiv"
      key={user.id}
      onClick={() => props.viewActivity(user.id)}
      >
        <div className="cardItemTitle">
          {user.name}
        </div>
        <div className="cardItemInfo">
          {user.email}
          <div className="cardItemTime">
              {
                'Last Login: '
                + last_login.getDate()
                +'-' + (last_login.getMonth() + 1)
                + '-' + last_login.getFullYear()
              }
            </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col indexArea">
      <UsersIndex />
    </div>
  );
}

export default Users;
