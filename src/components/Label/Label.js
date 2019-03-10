import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ id, children, variant }) => (
  <label
    className={`form__label${variant ? ` form__label--${variant}` : ''}`}
    htmlFor={id}
  >
    {children}
  </label>
);

Label.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

Label.defaultProps = {
  variant: null,
};

export default Label;
