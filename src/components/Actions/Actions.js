import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import * as routes from 'constants/routes';
import { ActionTypes } from 'constants/constants';
import { signOut } from 'actions/sessionActions';

import './Actions.css';

const undoAction = game => ({
  type: ActionTypes.saveStatePostUndo,
  game,
});

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    return (
      <div className={`actions${this.state.visible ? ' actions--visible' : ''}`}>
        <button className="actions__toggle-button" onClick={this.toggleMenu.bind(this)}>Toggle menu</button>
        <div className="actions__actions">
          <Link to={routes.NEW_CHORE} className="form__button">Add a chore</Link>
          { this.props.numChores > 1 ?
          <Link to={routes.NEW_CHAIN} className="form__button">Create a chain</Link> : null }
          <button onClick={() => {
              this.props.undo();
              this.props.saveStatePostUndo(this.props.game);
            }}
            disabled={!this.props.canUndo}
            className="form__button form__button--secondary">Undo</button>
          <button onClick={() => { this.props.doSignOut(); }}
            className="form__button form__button--secondary">Sign out</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  numChores: Object.keys(state.chores.present).length,
  canUndo: state.chores.past.length > 0,
  game: state.session.game.gameId,
});

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(ActionCreators.undo()),
  doSignOut: () => dispatch(signOut()),
  saveStatePostUndo: game => dispatch(undoAction(game)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
