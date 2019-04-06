import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Label from 'components/Label';

const InputWithLabel = ({
  id, type, value, onChange, placeholder, labelText, labelVariant,
}) => (
  <>
    <Label variant={labelVariant} id={id}>{labelText}</Label>
    <Input
      id={id}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
    />
  </>
);

InputWithLabel.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  labelVariant: PropTypes.string,
};

InputWithLabel.defaultProps = {
  id: null,
  type: 'text',
  placeholder: '',
  labelVariant: null,
};

export default InputWithLabel;
