import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = ({
  id, type, name, value, onChange, onClick, placeholder,
  maxLength, min, max, pattern, className,
}) => (
  <input
    className={`${className} input`}
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    onClick={onClick}
    maxLength={maxLength}
    pattern={pattern}
    placeholder={placeholder}
    min={min}
    max={max}
  />
);

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'date', 'datetime-local']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pattern: PropTypes.string,
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
  placeholder: '',
  className: '',
};

export default Input;
