import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import api from "../../../api";
import Comments from "./userPage/comments/comments";
import UserInfo from "./userPage/userInfo/userInfo";

const User = () => {
  const [user, setUser] = useState();
  const history = useHistory();
  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
    });
  }, [userId]);

  const handleAllUsers = () => {
    history.push(`/users/${userId}/edit`);
  };

  return (
    <>
      {user ? (
        <>
          <div className="container">
            <div className="row gutters-sm">
              <UserInfo user={user} handleAllUsers={handleAllUsers} />
              <Comments userId={userId} />
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex flex-row align-items-center justify-content-center h5 mt-3">
          loading...
        </div>
      )}
    </>
  );
};

export default User;
