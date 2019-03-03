import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import withAuthorization from 'components/withAuthorization';

import GameHeader from 'components/GameHeader';
import ChoresList from 'components/ChoresList';
import Actions from 'components/Actions';

import { getFilteredChoresArray } from 'constants/utils';

class Chores extends Component {
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
      holiday, user, game, players, points, chores,
    } = this.props;
    const { filteredChores } = this.state;
    return (
      <div className="app">
        <GameHeader players={players} points={points} gameId={game} />
        <div className="app__chores">
          { holiday ? (
            <p>
              Your game is set to holiday mode. If you&#39;re back from your break you can
              change this setting in your profile. Otherwise, enjoy yourselves and
              don&#39;t worry about chores!
            </p>
          ) : filteredChores && (
            <ChoresList chores={filteredChores} user={user} game={game} allChores={chores} />
          )}
          <Actions numChores={filteredChores.length} />
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.pointsLoaded || !state.choresLoaded || !state.playersLoaded;

const mapStateToProps = state => ({
  players: state.players,
  chores: state.chores,
  user: state.session.authUser.uid,
  game: state.session.game.gameId,
  holiday: state.session.holiday,
  points: state.points,
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps),
)(Chores);
