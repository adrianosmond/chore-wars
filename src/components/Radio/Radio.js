import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name, value, onChange, checked,
}) => (
  <input
    name={name}
    type="radio"
    value={value}
    onChange={onChange}
    checked={checked}
  />
);

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

Input.defaultProps = {
  name: null,
  checked: null,
};

export default Input;
