import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'

import Loading from './Loading'

import { auth, database } from '../lib/firebase'
import { setAuthUser, setGame } from '../actions/sessionActions'
import { loadChores } from '../actions/choreActions'
import { loadPoints } from '../actions/pointActions'
import * as routes from '../constants/routes'

const withAuthorization = (authCondition, componentIsLoading) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: componentIsLoading({
          pointsLoaded: props.pointsLoaded,
          choresLoaded: props.choresLoaded
        })
      }
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        this.props.setAuthUser(authUser)
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LOGIN)
        } else {
          database.ref(`users/${authUser.uid}`).once('value', (result) => {
            const game = result.val()
            this.props.setGame(game)
            const gameId = game.gameId
            this.props.loadChores(gameId)
            this.props.loadPoints(gameId)
          })
        }
      })
    }

    componentWillReceiveProps(newProps) {
      this.setState({
        loading: componentIsLoading({
          pointsLoaded: newProps.pointsLoaded,
          choresLoaded: newProps.choresLoaded
        })
      })
    }

    render() {
      if (!this.props.authUser) return null;
      if (!this.props.game || this.state.loading) return <Loading />
      return <Component />
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.session.authUser,
    game: state.session.game,
    pointsLoaded: state.session.pointsLoaded,
    choresLoaded: state.session.choresLoaded
  });

  const mapDispatchToProps = (dispatch) => ({
    setAuthUser: (authUser) => dispatch(setAuthUser(authUser)),
    setGame: (game) => dispatch(setGame(game)),
    loadChores: (game) => dispatch(loadChores(game)),
    loadPoints: (game) => dispatch(loadPoints(game))
  });

  return compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  )(WithAuthorization);
}

export default withAuthorization
