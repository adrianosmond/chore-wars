import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'

import Loading from './Loading'

import { auth, database } from '../lib/firebase'
import { setAuthUser, setGame } from '../actions/sessionActions'
import * as routes from '../constants/routes'

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        this.props.setAuthUser(authUser)
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LOGIN)
        } else {
          database.ref(`users/${authUser.uid}`).once('value', (result) => {
            this.props.setGame(result.val())
          })
        }
      })
    }

    render() {
      if (!this.props.authUser) return null;
      if (!this.props.game) return <Loading />
      return <Component />
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.session.authUser,
    game: state.session.game
  });

  const mapDispatchToProps = (dispatch) => ({
    setAuthUser: (authUser) => dispatch(setAuthUser(authUser)),
    setGame: (game) => dispatch(setGame(game))
  });

  return compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  )(WithAuthorization);
}

export default withAuthorization
