import React, { Component } from  'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../withAuthorization';
import ChoreForm from '../ChoreForm';

import { updateChore } from '../../actions/choreActions';

import * as routes from '../../constants/routes';

class EditChore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: this.props.match.params.slug,
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
        // TODO - Slug not found. Redirect?
      }
    }
  }

  onSubmit(chore, slug) {
    this.props.updateChore(this.state.slug, chore, slug, this.props.game);
    this.props.history.push(routes.CHORES);
  }

  render() {
    const { chore } = this.state;
    if (!chore) return null;
    return (
      <ChoreForm
        onSubmit={this.onSubmit.bind(this)}
        chore={chore} />
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

const mapStateToProps = state => ({
  game: state.session.game.gameId,
  chores: state.chores.chores,
});

const mapDispatchToProps = dispatch => ({
  updateChore: (slug, newChore, newSlug, game) =>
    dispatch(updateChore(slug, newChore, newSlug, game)),
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(EditChore);
