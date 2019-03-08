import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import SetupGame from 'components/SetupGame';
import withAuthorization from 'components/withAuthorization';

import { createGame, joinGame } from 'state/reducers/sessionReducer';

const NoGame = ({
  history, user, doCreateGame, doJoinGame,
}) => (
  <SetupGame
    history={history}
    user={user}
    doCreateGame={doCreateGame}
    doJoinGame={doJoinGame}
  />
);

NoGame.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.string.isRequired,
  doCreateGame: PropTypes.func.isRequired,
  doJoinGame: PropTypes.func.isRequired,
};

const authCondition = authUser => !!authUser;
const isLoading = () => false;

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
});

const mapDispatchToProps = dispatch => ({
  doCreateGame: (userId, name) => dispatch(createGame(userId, name)),
  doJoinGame: (userId, gameToJoin, name) => dispatch(joinGame(userId, gameToJoin, name)),
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(NoGame);
