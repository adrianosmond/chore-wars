import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as routes from 'constants/routes';

import './Actions.css';

class Actions extends Component {
  state = {
    visible: false,
  };

  static propTypes = {
    numChores: PropTypes.number.isRequired,
  }

  toggleMenu = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  render() {
    const { visible } = this.state;
    const { numChores } = this.props;
    return (
      <div className={`actions${visible ? ' actions--visible' : ''}`}>
        <button
          className="actions__toggle-button"
          type="button"
          onClick={this.toggleMenu}
        >
          Toggle menu
        </button>
        <div className="actions__actions">
          <Link to={routes.NEW_CHORE} className="form__button">Add a chore</Link>
          { numChores > 1 ? (
            <Link
              to={routes.NEW_CHAIN}
              className="form__button"
              id="actions-create-chain"
            >
              Create a chain
            </Link>
          ) : null }
          <Link to={routes.EDIT_PROFILE} className="form__button form__button--tertiary">My Profile</Link>
        </div>
      </div>
    );
  }
}

export default Actions;
