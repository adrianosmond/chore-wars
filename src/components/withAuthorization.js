import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { auth, database } from 'utils/database';

import Loading from 'components/Loading';

import { setAuthUser, setGame, loadHoliday } from 'actions/sessionActions';
import { loadPlayers } from 'actions/playerActions';
import { loadPoints } from 'actions/pointActions';
import { loadChores } from 'actions/choreActions';
import * as routes from 'constants/routes';

const withAuthorization = (authCondition, componentIsLoading) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      const { playersLoaded, pointsLoaded, choresLoaded } = props;
      this.state = {
        loading: componentIsLoading({
          playersLoaded,
          pointsLoaded,
          choresLoaded,
        }),
      };
    }

    componentDidMount() {
      const {
        history, doSetAuthUser, doSetGame, doLoadPlayers, doLoadPoints, doLoadChores, doLoadHoliday,
      } = this.props;
      auth.onAuthStateChanged((authUser) => {
        doSetAuthUser(authUser);
        if (!authCondition(authUser)) {
          history.push(routes.LOGIN);
        } else {
          database.ref(`users/${authUser.uid}`).once('value', (result) => {
            const game = result.val();
            if (game && process.env.NODE_ENV === 'development') game.gameId = '-TEST';
            if (game && game.gameId) {
              const { gameId } = game;
              if (gameId) {
                doSetGame(game);
                doLoadPlayers(gameId);
                doLoadPoints(gameId);
                doLoadChores(gameId);
                doLoadHoliday(gameId);
              }
            } else {
              history.push(routes.NO_GAME);
            }
          });
        }
      });
    }

    componentWillReceiveProps(newProps) {
      const {
        playersLoaded, pointsLoaded, choresLoaded, location, history,
      } = newProps;

      this.setState({
        loading: componentIsLoading({
          playersLoaded,
          pointsLoaded,
          choresLoaded,
        }),
      });

      if (location.pathname === routes.NO_GAME) {
        // When we've got a game, we can redirect to the chores page
        if (newProps.game && newProps.game.gameId) {
          history.push(routes.CHORES);
        }
      }
    }

    render() {
      const { authUser, game, location } = this.props;
      const { loading } = this.state;

      if (!authUser || (!game && location.pathname !== routes.NO_GAME) || loading) {
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
    doSetAuthUser: authUser => dispatch(setAuthUser(authUser)),
    doSetGame: game => dispatch(setGame(game)),
    doLoadPlayers: game => dispatch(loadPlayers(game)),
    doLoadPoints: game => dispatch(loadPoints(game)),
    doLoadChores: game => dispatch(loadChores(game)),
    doLoadHoliday: game => dispatch(loadHoliday(game)),
  });

  return compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  )(WithAuthorization);
};

export default withAuthorization;
