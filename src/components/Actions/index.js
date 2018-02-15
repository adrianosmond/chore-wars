import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import * as routes from '../../constants/routes';

import './index.css';

const Actions = props => (
  <div className="actions">
    <Link to={routes.NEW_CHORE} className="form__button">Add a chore</Link>
    <button onClick={props.undo} disabled={!props.canUndo} className="form__button form__button--secondary">Undo</button>
  </div>
);

const mapStateToProps = state => ({
  canUndo: state.chores.past.length > 0,
});

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(ActionCreators.undo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
