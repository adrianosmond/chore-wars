import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import * as routes from '../../constants/routes';

import './index.css';

const undoAction = game => ({
  type: 'SAVE_STATE_POST_UNDO',
  game,
});

const Actions = props => (
  <div className="actions">
    <Link to={routes.NEW_CHORE} className="form__button">Add a chore</Link>
    <button onClick={() => { props.undo(); props.saveStatePostUndo(props.game); }} disabled={!props.canUndo} className="form__button form__button--secondary">Undo</button>
  </div>
);

const mapStateToProps = state => ({
  canUndo: state.chores.past.length > 0,
  game: state.session.game.gameId,
});

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(ActionCreators.undo()),
  saveStatePostUndo: game => dispatch(undoAction(game)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
