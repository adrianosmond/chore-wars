import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as routes from 'constants/routes';

import Button from '../Button';

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
          <Button to={routes.NEW_CHORE}>Add a chore</Button>
          { numChores > 1 ? (
            <Button
              to={routes.NEW_CHAIN}
              id="actions-create-chain"
            >
              Create a chain
            </Button>
          ) : null }
          <Button to={routes.EDIT_PROFILE} variant="tertiary">My Profile</Button>
        </div>
      </div>
    );
  }
}

export default Actions;
