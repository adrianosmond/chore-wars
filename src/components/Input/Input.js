import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = ({
  id, type, name, value, onChange, onClick, placeholder,
  maxLength, min, max, pattern, checked, className,
}) => {
  let inputClassName = `${className}`;
  if (type !== 'radio') {
    inputClassName += ' input';
  }
  return (
    <input
      className={inputClassName}
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      maxLength={maxLength}
      checked={checked}
      pattern={pattern}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'email', 'radio']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  pattern: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  id: null,
  name: null,
  type: 'text',
  onClick: null,
  maxLength: null,
  min: null,
  max: null,
  pattern: null,
  checked: null,
  placeholder: '',
  className: '',
};

export default Input;
