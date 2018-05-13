import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ChoreChain from 'components/ChoreChain';
import withAuthorization from 'components/withAuthorization';

import { makeChain } from 'actions/choreActions';
import { convertChoresToArray } from 'constants/utils';
import * as routes from 'constants/routes';

const filterAndSortChores = (chores) => {
  if (!chores) return null;
  return convertChoresToArray(chores)
    .sort((a, b) => {
      if (a.slug < b.slug) return -1;
      if (b.slug < a.slug) return 1;
      return 0;
    })
    .filter(chore => !chore.enables);
};

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
    this.props.makeChain(this.props.game, chain.map(chore => chore.slug));
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

const mapDispatchToProps = dispatch => ({
  makeChain: (game, chain) => dispatch(makeChain(game, chain)),
});

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

export default compose(
  withAuthorization(authCondition, isLoading),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Chain);
