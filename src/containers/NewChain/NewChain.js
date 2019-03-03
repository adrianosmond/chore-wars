import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import ChoreChain from 'components/ChoreChain';
import withAuthorization from 'components/withAuthorization';

import { makeChain } from 'utils/database';
import { filterAndSortChores } from 'constants/utils';
import * as routes from 'constants/routes';

class Chain extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    chores: PropTypes.objectOf(PropTypes.any).isRequired,
    game: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      chores: filterAndSortChores(props.chores),
    };
  }

  componentWillReceiveProps(newProps) {
    const { chores } = this.props;
    if (chores !== newProps.chores) {
      this.setState({
        chores: filterAndSortChores(newProps.chores),
      });
    }
  }

  saveChain = (chain) => {
    const { game, history } = this.props;
    makeChain(game, chain.map(chore => chore.slug));
    history.push(routes.CHORES);
  }

  render() {
    const { chores } = this.state;
    if (!chores) return null;
    return <ChoreChain chores={chores} saveChain={this.saveChain} />;
  }
}

const mapStateToProps = state => ({
  game: state.session.game.gameId,
  chores: state.chores,
});

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

export default compose(
  withAuthorization(authCondition, isLoading),
  withRouter,
  connect(mapStateToProps),
)(Chain);
