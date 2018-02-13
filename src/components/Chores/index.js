import React, { Component } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import withAuthorization from '../../components/withAuthorization'

import PointsGraph from '../../components/PointsGraph'
import ChoresList from '../../components/ChoresList'
import Admin from '../../components/Admin'

import { processChore, sortByCurrentPoints } from '../../constants/utils'

class Chores extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chores: null
    }
  }

  componentWillMount() {
    this.setChores(this.props.chores)
  }

  convertChoresToArray(choresObj) {
    let choresArr = Object.keys(choresObj).map((key) => {
      const chore = choresObj[key]
      return {
        ...chore,
        slug: key,
        ...processChore(chore)
      }
    })

    choresArr.sort(sortByCurrentPoints)

    return choresArr
  }

  setChores(chores) {
    this.setState({
      chores: this.convertChoresToArray(chores)
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.chores !== this.props.chores) {
      this.setChores(newProps.chores)
    }
  }

  render() {
    const { points } = this.props
    const { chores } = this.state
    return (
      <div className="app">
        { points ? <PointsGraph points={points}/> : null }
        <div className="app__chores">
          { chores ? <ChoresList chores={chores} /> : null }
          <Admin />
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;
const isLoading = (state) => !state.pointsLoaded || !state.choresLoaded

const mapStateToProps = (state) => ({
  game: state.session.game,
  points: state.points.points,
  chores: state.chores.chores
})

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps)
)(Chores)
