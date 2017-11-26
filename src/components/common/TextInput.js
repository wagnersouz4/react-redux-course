import React, { PropTypes } from 'react';

const TextInput = props => {
  const {
    name,
    label,
    onChange,
    placeholder,
    value,
    error
  } = props;

  const hasError = error && error.length > 0;
  const wrapperClass = hasError
    ? 'form-group has-error'
    : 'form-group';

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
          {hasError && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;