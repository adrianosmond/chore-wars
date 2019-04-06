import React from 'react';
import PropTypes from 'prop-types';

import './Label.css';

const Label = ({ id, children, variant }) => (
  <label
    className={`label${variant ? ` label--${variant}` : ''}`}
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
