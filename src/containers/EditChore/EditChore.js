import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import withAuthorization from 'components/withAuthorization';
import ChoreForm from 'components/ChoreForm';

import { loadChores } from 'state/reducers/choresReducer';
import { updateChore } from 'utils/database';

import * as routes from 'constants/routes';

class EditChore extends Component {
  static propTypes = {
    currentTime: PropTypes.number,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    chores: PropTypes.objectOf(PropTypes.any).isRequired,
    game: PropTypes.string.isRequired,
    doLoadChores: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  static defaultProps = {
    currentTime: null,
  }

  constructor(props) {
    super(props);
    const { currentTime, match } = this.props;

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

  onSubmit = (chore, oldSlug) => {
    const { game, chores, history } = this.props;
    const { slug } = this.state;
    updateChore(slug, chore, oldSlug, game, chores);
    history.push(routes.CHORES);
  }

  render() {
    const { chore, currentTime } = this.state;
    if (!chore) return null;
    return (
      <ChoreForm
        onSubmit={this.onSubmit}
        currentTime={currentTime}
        chore={chore}
      />
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

const mapStateToProps = state => ({
  game: state.session.game.gameId,
  chores: state.chores.present,
});

const mapDispatchToProps = dispatch => ({
  doLoadChores: game => dispatch(loadChores(game)),
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(EditChore);
