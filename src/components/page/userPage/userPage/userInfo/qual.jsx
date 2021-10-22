import React from "react";
import Qualities from "../../../../ui/qualities";
import PropTypes from "prop-types";

const Qual = ({ user }) => {
  return (
    <div className="card mb-3">
      <div
        className="
                card-body
                d-flex
                flex-column
                justify-content-center
                text-center
            "
      >
        <h5 className="card-title">
          <span>Качества</span>
        </h5>
        <p className="card-text">
          <Qualities qualities={user.qualities} />
        </p>
      </div>
    </div>
  );
};

Qual.propTypes = {
  user: PropTypes.object,
};

export default Qual;
