import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../utils/validator";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

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
    console.log(target);
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
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
      <CheckBoxField value={data.stayOn} onChange={changeHandler} name="stayOn">
        Оставаться в системе
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

export default LoginForm;
