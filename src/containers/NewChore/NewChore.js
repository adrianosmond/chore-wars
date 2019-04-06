import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import ChoreForm from 'components/ChoreForm';
import withAuthorization from 'components/withAuthorization';

import { addChore } from 'utils/database';

import * as routes from 'constants/routes';

class NewChore extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    currentTime: PropTypes.number,
    game: PropTypes.string.isRequired,
  }

  static defaultProps = {
    currentTime: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentTime: props.currentTime || new Date().getTime(),
      chore: {
        title: '',
        slug: '',
        frequency: 7,
        pointsPerTime: 10,
        lastDone: new Date().getTime(),
      },
    };
  }

  onSubmit = (chore, slug) => {
    const { game, history } = this.props;
    addChore(chore, game, slug);
    history.push(routes.CHORES);
  }

  render() {
    const { chore, currentTime } = this.state;
    return (
      <ChoreForm
        onSubmit={this.onSubmit}
        timeNow={currentTime}
        chore={chore}
      />
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = () => false;

const mapStateToProps = state => ({
  game: state.session.game.gameId,
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps),
  withRouter,
)(NewChore);
