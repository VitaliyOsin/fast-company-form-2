import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, value, onChange, label, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return `form-check-input ${error ? "is-invalid" : ""}`;
  };
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options &&
          options.map((option) => (
            <div
              key={`${option.name}_${option.value}`}
              className="form-check form-check-inline"
            >
              <input
                className={getInputClasses()}
                type="radio"
                checked={option.value === value}
                name={name}
                id={`${option.name}_${option.value}`}
                value={option.value}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor={`${option.name}_${option.value}`}
              >
                {option.name}
              </label>
            </div>
          ))}
      </div>
      {error && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {error}
        </div>
      )}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioField;
