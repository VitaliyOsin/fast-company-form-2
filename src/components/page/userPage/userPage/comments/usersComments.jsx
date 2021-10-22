import React from "react";
import PropTypes from "prop-types";
import CommentUnit from "./commentUnit";

const UsersComment = ({ comments, removeComment }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {comments ? (
          comments.map((comment) => (
            <CommentUnit
              key={comment._id}
              comment={comment}
              removeComment={removeComment}
            />
          ))
        ) : (
          <h5>Комментариев пока нет</h5>
        )}
      </div>
    </div>
  );
};

UsersComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default UsersComment;
