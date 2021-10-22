import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../../../api";
import NewComment from "./newComment";
import UsersComment from "./usersComments";

const Comments = ({ userId }) => {
  const [comments, setComments] = useState();

  const removeComment = async (id) => {
    await api.comments.remove(id);
    setComments((prev) => prev.filter((v) => v._id !== id));
  };

  const addComment = async (data) => {
    const newComment = await api.comments.add(data);
    setComments((prev) => [newComment, ...prev]);
  };

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <div className="col-md-8">
      <NewComment userId={userId} addComment={addComment} />
      <UsersComment comments={comments} removeComment={removeComment} />
    </div>
  );
};

Comments.propTypes = {
  userId: PropTypes.string,
};

export default Comments;
