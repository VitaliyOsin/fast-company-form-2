import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router";

const EditPage = () => {
  const params = useParams();
  const { userId } = params;
  const [data, setData] = useState({
    email: "",
    name: "",
    profession: "",
    sex: "",
    qualities: [],
  });
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const history = useHistory();
  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введён некорректно" },
    },
    name: {
      isRequired: { message: "Имя обязателено для заполнения" },
    },
    profession: {
      isRequired: { message: "Выберите профессию" },
    },
    qualities: {
      isFullArray: { message: "Выберите хотя бы одно качество" },
    },
    sex: {
      isRequired: { message: "Обязательно выберите пол пользователя" },
    },
  };
  const validate = () => {
    const error = validator(data, validatorConfig);
    setErrors(error);

    return Object.keys(errors).length === 0;
  };
  const isValide = Object.keys(errors).length === 0;
  useEffect(() => {
    validate();
  }, [data]);

  const changeHandler = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    api.users.getById(userId).then((user) => {
      setData({
        name: user.name,
        email: user.email || "",
        sex: user.sex || "",
        profession: user.profession._id,
        qualities: user.qualities,
      });
    });
  }, [userId]);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };

  const editHandler = async () => {
    await api.users.update(userId, {
      ...data,
      profession: professions.find((v) => v._id === data.profession),
      qualities: Object.values(qualities).filter((v) =>
        data.qualities.reduce((t, v) => (t = [...t, v._id]), []).includes(v._id)
      ),
    });
    history.push("/users");
  };

  const handleBackButton = () => {
    history.push(`/users/${userId}`);
  };

  return (
    <div className="container mt-5">
      <button onClick={handleBackButton} className="btn btn-primary">
        Назад
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Редактировать пользователя</h3>

          <form onSubmit={submitHandle} action="">
            <TextField
              label="Имя:"
              name="name"
              value={data.name}
              error={errors.name}
              handler={changeHandler}
            />
            <TextField
              label="Электронная почта:"
              name="email"
              value={data.email}
              error={errors.email}
              handler={changeHandler}
            />
            <SelectField
              label="Выберите вашу профессию"
              value={data.profession}
              onChange={changeHandler}
              defaultOption="Выбрать..."
              name="profession"
              options={professions}
              error={errors.profession}
            />
            <RadioField
              options={[
                { name: "Мужчина", value: "male" },
                { name: "Женщина", value: "female" },
              ]}
              value={data.sex}
              name="sex"
              onChange={changeHandler}
              label="Выберите пол пользователя"
              error={errors.sex}
            />
            {qualities && (
              <MultiSelectField
                options={qualities}
                value={data.qualities}
                onChange={changeHandler}
                label="Ваши качества (выберите несколько)"
                error={errors.qualities}
                name="qualities"
              />
            )}

            <button
              disabled={!isValide}
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              onClick={editHandler}
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
