import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import withAuthorization from 'components/withAuthorization';
import ChoreForm from 'components/ChoreForm';

import { loadChores } from 'state/reducers/choresReducer';
import { completeChore } from 'utils/database';

import * as routes from 'constants/routes';
import { computedChoreProperties } from 'constants/utils';

class LogPastCompletion extends Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    currentTime: PropTypes.number,
    chores: PropTypes.objectOf(PropTypes.any).isRequired,
    game: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    doLoadChores: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  static defaultProps = {
    currentTime: null,
  }

  constructor(props) {
    super(props);

    const { match, currentTime } = props;

    this.state = {
      slug: match.params.slug,
      currentTime: currentTime || new Date().getTime(),
      chore: null,
    };
  }

  componentWillMount() {
    const { chores, game, doLoadChores } = this.props;
    const { slug } = this.state;
    if (chores && chores[slug]) {
      this.setState({
        chore: chores[slug],
      });
    } else {
      doLoadChores(game);
    }
  }

  componentWillReceiveProps(newProps) {
    const { chores, history } = this.props;
    const { slug } = this.state;
    if (newProps.chores !== chores) {
      if (newProps.chores && newProps.chores[slug]) {
        this.setState({
          chore: newProps.chores[slug],
        });
      } else {
        // Chore not found, so redirect
        history.push(routes.CHORES);
      }
    }
  }

  onSubmit = (updatedChore, slug) => {
    const { user, game, history } = this.props;
    const { chore } = this.state;
    const completedChore = {
      ...chore,
      slug,
      ...computedChoreProperties(chore, updatedChore.lastDone),
    };
    completeChore(completedChore, user, game, updatedChore.lastDone);
    history.push(routes.CHORES);
  }

  render() {
    const { chore, currentTime } = this.state;
    if (!chore) return null;
    return (
      <ChoreForm
        onSubmit={this.onSubmit}
        currentTime={currentTime}
        questions={['forgotToLog']}
        chore={chore}
      />
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
  game: state.session.game.gameId,
  chores: state.chores,
});

const mapDispatchToProps = dispatch => ({
  doLoadChores: game => dispatch(loadChores(game)),
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(LogPastCompletion);
