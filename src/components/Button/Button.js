import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = ({
  type, children, to, onClick, variant, disabled,
}) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`button${variant ? ` button--${variant}` : ''}`}
      >
        {children}
      </Link>
    );
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={`button${variant ? ` button--${variant}` : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf([null, 'secondary', 'tertiary', 'quaternary']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  variant: null,
  onClick: null,
  to: null,
  disabled: false,
};

export default Button;
