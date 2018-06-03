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
    this.state = {
      chores: getFilteredChoresArray(props.chores),
    };
  }


  componentWillReceiveProps(newProps) {
    if (newProps.chores !== this.props.chores) {
      this.setState({
        chores: getFilteredChoresArray(newProps.chores),
      });
    }
  }

  render() {
    const { chores } = this.state;
    const { holiday } = this.props;
    return (
      <div className="app">
        <GameHeader />
        <div className="app__chores">
          { chores && !holiday ? <ChoresList chores={chores} /> : null }
          { holiday ? <p>Your game is set to holiday mode. If you're back from your break you can
            change this setting in your profile. Otherwise, enjoy yourselves and don't worry about
            chores!</p> : null }
          <Actions />
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.pointsLoaded || !state.choresLoaded || !state.playersLoaded;

const mapStateToProps = state => ({
  chores: state.chores.present,
  holiday: state.session.holiday,
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps),
)(Chores);
