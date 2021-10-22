import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = () => {
    setFormType((prev) => (prev === "register" ? "login" : "register"));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">
            {formType === "register" ? "Registration" : "Login"}
          </h3>
          {formType === "register" ? (
            <>
              <RegisterForm />
              <p className="mt-3">
                Уже есть аккаунт? -{" "}
                <button
                  className="btn btn-link"
                  role="button"
                  onClick={toggleFormType}
                >
                  Войти
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p className="mt-3">
                Нет аккаунта? -{" "}
                <button
                  className="btn btn-link"
                  role="button"
                  onClick={toggleFormType}
                >
                  Регистрация
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
