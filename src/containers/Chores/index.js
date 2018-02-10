import React, { Component } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { loadChores } from '../../actions/choreActions'
import { loadPoints } from '../../actions/pointActions'

import withAuthorization from '../../components/withAuthorization'

import PointsGraph from '../../components/PointsGraph'
import ChoresList from '../../components/ChoresList'
import Admin from '../../components/Admin'

class Chores extends Component {
  componentWillMount() {
    this.props.loadChores(this.props.game.gameId)
    this.props.loadPoints(this.props.game.gameId)
  }

  render() {
    const { points, chores } = this.props
    return (
      <div className="app">
        <div className="app__chores">
          { points ? <PointsGraph points={points}/> : null }
          { chores ? <ChoresList chores={chores} /> : null }
        </div>
        <div className="app__admin">
          <Admin />
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = (state) => ({
  game: state.session.game,
  points: state.points.points,
  chores: state.chores.chores
})

const mapDispatchToProps = (dispatch) => {
  return {
    loadChores: (game) => dispatch(loadChores(game)),
    loadPoints: (game) => dispatch(loadPoints(game)),
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Chores)
