import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false,
  });
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введён некорректно" },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapital: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: { message: "Пароль должен содержать хотя бы одно число" },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    profession: {
      isRequired: { message: "Выберите профессию" },
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без соглашения лицензионного соглашения",
      },
    },
    qualities: {
      isFullArray: { message: "Выберите хотя бы одно качество" },
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

  return (
    <form onSubmit={submitHandle} action="">
      <TextField
        label="Email:"
        name="email"
        value={data.email}
        error={errors.email}
        handler={changeHandler}
      />
      <TextField
        label="Пароль:"
        type="password"
        name="password"
        value={data.password}
        error={errors.password}
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
        label="Выберите ваш пол"
      />
      {qualities && (
        <MultiSelectField
          options={qualities}
          onChange={changeHandler}
          label="Ваши качества (выберите несколько)"
          error={errors.qualities}
          name="qualities"
        />
      )}
      <CheckBoxField
        value={data.licence}
        onChange={changeHandler}
        name="licence"
        error={errors.licence}
      >
        Подтвердить{" "}
        <a href="" role="button">
          лицензионное соглашение
        </a>
      </CheckBoxField>
      <button
        disabled={!isValide}
        className="btn btn-primary w-100 mx-auto"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
