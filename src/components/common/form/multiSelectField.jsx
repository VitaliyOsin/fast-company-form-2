import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { oborar } from "../../../utils";

const MultiSelectField = ({ options, onChange, label, error, name, value }) => {
  const defaultVal = value
    ? value.reduce((t, v) => {
        t.push({ label: v.name, value: v._id });
        return t;
      }, [])
    : [];

  const optionsArray = oborar(options);

  const handleChange = (value) => {
    const val = value.reduce((t, v) => {
      t.push({ name: v.label, _id: v.value });
      return t;
    }, []);

    onChange({ name: name, value: val });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      {value ? (
        <Select
          isMulti
          closeMenuOnSelect={false}
          name="qualities"
          options={optionsArray}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          value={defaultVal}
        />
      ) : (
        <Select
          isMulti
          closeMenuOnSelect={false}
          name="qualities"
          options={optionsArray}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
        />
      )}

      {error && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {error}
        </div>
      )}
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.object),
};

export default MultiSelectField;
