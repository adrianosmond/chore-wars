import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ChoreChain from 'components/ChoreChain';
import withAuthorization from 'components/withAuthorization';

import { makeChain } from 'utils/database';
import { filterAndSortChores } from 'constants/utils';
import * as routes from 'constants/routes';

class Chain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: filterAndSortChores(props.chores),
      chain: [],
      stage: 'selection',
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.chores !== newProps.chores) {
      this.setState({
        chores: filterAndSortChores(newProps.chores),
      });
    }
  }

  saveChain(chain) {
    makeChain(this.props.game, chain.map(chore => chore.slug));
    this.props.history.push(routes.CHORES);
  }

  render() {
    const { chores } = this.state;
    if (!chores) return null;
    return <ChoreChain chores={chores} saveChain={this.saveChain.bind(this)} />;
  }
}

const mapStateToProps = state => ({
  game: state.session.game.gameId,
  chores: state.chores.present,
});

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

export default compose(
  withAuthorization(authCondition, isLoading),
  withRouter,
  connect(mapStateToProps),
)(Chain);
