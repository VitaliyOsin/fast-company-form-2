import React from "react";
import PropTypes from "prop-types";
import Head from "./head";
import Qual from "./qual";
import Meetings from "./meetings";

const UserInfo = ({ user, handleAllUsers }) => {
  return (
    <div className="col-md-4 mb-3">
      <Head user={user} handleAllUsers={handleAllUsers} />
      <Qual user={user} />
      <Meetings user={user} />
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object,
  handleAllUsers: PropTypes.func,
};

export default UserInfo;
