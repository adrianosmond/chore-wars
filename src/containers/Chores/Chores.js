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
    return (
      <div className="app">
        <GameHeader />
        <div className="app__chores">
          { chores ? <ChoresList chores={chores} /> : null }
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
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps),
)(Chores);
