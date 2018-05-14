import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import Loading from 'components/Loading';

import { auth, database } from 'lib/firebase';
import { setAuthUser, setGame } from 'actions/sessionActions';
import { loadPlayers } from 'actions/playerActions';
import { loadPoints } from 'actions/pointActions';
import { loadChores } from 'actions/choreActions';
import * as routes from 'constants/routes';

const withAuthorization = (authCondition, componentIsLoading) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: componentIsLoading({
          playersLoaded: props.playersLoaded,
          pointsLoaded: props.pointsLoaded,
          choresLoaded: props.choresLoaded,
        }),
      };
    }

    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        this.props.setAuthUser(authUser);
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LOGIN);
        } else {
          database.ref(`users/${authUser.uid}`).once('value', (result) => {
            const game = result.val();
            // if (game && process.env.NODE_ENV === 'development') game.gameId = '-TEST';
            if (game && game.gameId) {
              const { gameId } = game;
              if (gameId) {
                this.props.setGame(game);
                this.props.loadPlayers(gameId);
                this.props.loadPoints(gameId);
                this.props.loadChores(gameId);
              }
            } else {
              this.props.history.push(routes.NO_GAME);
            }
          });
        }
      });
    }

    componentWillReceiveProps(newProps) {
      this.setState({
        loading: componentIsLoading({
          playersLoaded: newProps.playersLoaded,
          pointsLoaded: newProps.pointsLoaded,
          choresLoaded: newProps.choresLoaded,
        }),
      });

      if (this.props.location.pathname === routes.NO_GAME) {
        // When we've got a game, we can redirect to the chores page
        if (newProps.game && newProps.game.gameId) {
          this.props.history.push(routes.CHORES);
        }
      }
    }

    render() {
      if (!this.props.authUser) return null;
      if (this.state.loading) {
        return (
          <Loading />
        );
      }
      return (
        <Component />
      );
    }
  }

  const mapStateToProps = state => ({
    authUser: state.session.authUser,
    game: state.session.game,
    playersLoaded: state.session.playersLoaded,
    pointsLoaded: state.session.pointsLoaded,
    choresLoaded: state.session.choresLoaded,
  });

  const mapDispatchToProps = dispatch => ({
    setAuthUser: authUser => dispatch(setAuthUser(authUser)),
    setGame: game => dispatch(setGame(game)),
    loadPlayers: game => dispatch(loadPlayers(game)),
    loadPoints: game => dispatch(loadPoints(game)),
    loadChores: game => dispatch(loadChores(game)),
  });

  return compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  )(WithAuthorization);
};

export default withAuthorization;
