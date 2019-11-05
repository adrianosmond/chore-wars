import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import PropTypes from 'prop-types';

import withAuthorization from 'components/withAuthorization';

import GameHeader from 'components/GameHeader';
import ChoresList from 'components/ChoresList';
import Actions from 'components/Actions';

import { getFilteredChoresArray } from 'constants/utils';
import HolidayMessage from 'components/HolidayMessage';
import { canUndoSelector } from 'state/reducers';
import { saveStatePostUndo } from 'utils/database';

class Chores extends Component {
  static propTypes = {
    holiday: PropTypes.bool,
    user: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    players: PropTypes.objectOf(PropTypes.any).isRequired,
    points: PropTypes.objectOf(PropTypes.any).isRequired,
    chores: PropTypes.objectOf(PropTypes.any).isRequired,
    canUndo: PropTypes.bool.isRequired,
    undo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    holiday: null,
  }

  constructor(props) {
    super(props);
    const { chores } = this.props;
    this.state = {
      filteredChores: getFilteredChoresArray(chores),
    };
  }

  componentWillReceiveProps(newProps) {
    const { chores } = this.props;
    if (newProps.chores !== chores) {
      this.setState({
        filteredChores: getFilteredChoresArray(newProps.chores),
      });
    }
  }

  render() {
    const {
      holiday, user, game, players, points, chores, undo, canUndo,
    } = this.props;
    const { filteredChores } = this.state;
    return (
      <div className="app">
        <GameHeader players={players} points={points} gameId={game} />
        <div className="app__chores">
          { holiday ? (
            <HolidayMessage />
          ) : filteredChores && (
            <ChoresList chores={filteredChores} user={user} game={game} allChores={chores} />
          )}
          <Actions
            numChores={filteredChores.length}
            canUndo={canUndo}
            undo={undo}
          />
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.pointsLoaded || !state.choresLoaded || !state.playersLoaded;

const mapStateToProps = state => ({
  players: state.players,
  chores: state.chores.present,
  user: state.session.authUser.uid,
  game: state.session.game.gameId,
  holiday: state.session.holiday,
  points: state.points.present,
  canUndo: canUndoSelector(state),
});

const mapDispatchToProps = dispatch => ({
  undo: () => {
    dispatch(ActionCreators.undo());
    saveStatePostUndo();
  },
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
)(Chores);