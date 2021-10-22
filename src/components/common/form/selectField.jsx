import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  defaultOption,
  error,
  name,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return `form-select ${error ? "is-invalid" : ""}`;
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {options &&
          options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultOption: PropTypes.string,
};

export default SelectField;
