import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../../components/withAuthorization';
import ChoreForm from '../../components/ChoreForm';

import { loadChores, completeChore } from '../../actions/choreActions';

import * as routes from '../../constants/routes';
import { computedChoreProperties } from '../../constants/utils';

class LogPastCompletion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: this.props.match.params.slug,
      currentTime: props.currentTime || new Date().getTime(),
      chore: null,
    };
  }

  componentWillMount() {
    const { slug } = this.state;
    if (this.props.chores && this.props.chores[slug]) {
      this.setState({
        chore: this.props.chores[slug],
      });
    } else {
      this.props.loadChores(this.props.game);
    }
  }

  componentWillReceiveProps(newProps) {
    const { slug } = this.state;
    if (newProps.chores !== this.props.chores) {
      if (newProps.chores && newProps.chores[slug]) {
        this.setState({
          chore: newProps.chores[slug],
        });
      } else {
        // Chore not found, so redirect
        this.props.history.push(routes.CHORES);
      }
    }
  }

  onSubmit(chore, slug) {
    const completedChore = {
      ...this.state.chore,
      slug,
      ...computedChoreProperties(this.state.chore, chore.lastDone),
    };
    this.props.completeChore(completedChore, this.props.user, this.props.game, chore.lastDone);
    this.props.history.push(routes.CHORES);
  }

  render() {
    const { chore } = this.state;
    if (!chore) return null;
    return (
      <ChoreForm
        onSubmit={this.onSubmit.bind(this)}
        currentTime={this.state.currentTime}
        questions={['forgotToLog']}
        chore={chore} />
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
  game: state.session.game.gameId,
  chores: state.chores.present,
});

const mapDispatchToProps = dispatch => ({
  loadChores: game => dispatch(loadChores(game)),
  completeChore: (chore, user, game, time) =>
    dispatch(completeChore(chore, user, game, time)),
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(LogPastCompletion);
