import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../../../api";
import SelectField from "../../../../common/form/selectField";

const NewComment = ({ userId, addComment }) => {
  const [users, setUsers] = useState();
  const [commentor, setCommentor] = useState("");
  const [text, setText] = useState();

  const comHandler = (e) => {
    setCommentor(e.value);
  };

  const publishHandler = async () => {
    setText("");
    setCommentor("");
    await addComment({ userId: commentor, pageId: userId, content: text });
  };

  const textHandler = (e) => {
    const { target } = e;
    setText(target.value);
  };

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          {users && (
            <SelectField
              label=""
              options={users}
              defaultOption="Выберите пользователя"
              name="pro"
              onChange={comHandler}
              value={commentor}
            />
          )}

          <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Сообщение
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={textHandler}
              value={text}
            ></textarea>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary" onClick={publishHandler}>
              Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NewComment.propTypes = {
  userId: PropTypes.string,
  addComment: PropTypes.func,
};

export default NewComment;
