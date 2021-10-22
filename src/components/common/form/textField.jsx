import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, handler, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = ({ target }) => {
    handler({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return `form-control ${error ? "is-invalid" : ""}`;
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />

        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <i className="bi bi-eye"></i>
            ) : (
              <i className="bi bi-eye-slash"></i>
            )}
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: "text",
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handle: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
