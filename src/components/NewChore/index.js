import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import fecha from 'fecha';

import ChoreForm from '../ChoreForm';
import withAuthorization from '../../components/withAuthorization';

import { addChore } from '../../actions/choreActions';

import * as routes from '../../constants/routes';

class NewChore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chore: {
        title: '',
        slug: '',
        frequency: 7,
        pointsPerTime: 10,
        lastDone: new Date().getTime(),
      },
    };
  }

  onSubmit(chore, slug) {
    this.props.addChore(chore, this.props.game, slug);
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
const isLoading = () => false;

const mapStateToProps = state => ({
  game: state.session.game.gameId,
});

const mapDispatchToProps = dispatch => ({
  addChore: (chore, game, slug) => dispatch(addChore(chore, game, slug)),
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(NewChore);
