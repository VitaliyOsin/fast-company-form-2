import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handlerChange = () => {
    onChange({ name: name, value: !value });
  };
  const getInputClasses = () => {
    return `form-check-input ${error ? "is-invalid" : ""}`;
  };
  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          className={getInputClasses()}
          type="checkbox"
          value=""
          id={name}
          onChange={handlerChange}
          checked={value}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  error: PropTypes.string,
};

export default CheckBoxField;
