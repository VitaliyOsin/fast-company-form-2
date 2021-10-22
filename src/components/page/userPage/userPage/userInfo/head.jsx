import React from "react";
import PropTypes from "prop-types";

const Head = ({ user, handleAllUsers }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          onClick={handleAllUsers}
          className="position-absolute
                     top-0
                     end-0
                     btn btn-light btn-sm"
        >
          <i className="bi bi-gear"></i>
        </button>
        <div
          className="
                     d-flex
                     flex-column
                     align-items-center
                     text-center
                     position-relative
                 "
        >
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`}
            className="rounded-circle"
            alt="avatar"
            width="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary d-inline-block"
                role="button"
              ></i>
              <i
                className="bi bi-caret-up text-secondary d-inline-block"
                role="button"
              ></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Head.propTypes = {
  user: PropTypes.object,
  handleAllUsers: PropTypes.func,
};

export default Head;
