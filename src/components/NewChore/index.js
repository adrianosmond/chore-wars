import React, { Component } from  'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withAuthorization from '../../components/withAuthorization'

import { addChore } from '../../actions/choreActions'

import * as routes from '../../constants/routes'
import { processChore } from '../../constants/utils'

class NewChore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      frequency: 7,
      pointsPerTime: 0,
      lastDone: new Date().getTime()
    }
  }

  onSubmit(event) {
    event.preventDefault()

    //TODO - Validate form

    const chore = {
      ...this.state,
      ...processChore(this.state)
    }

    this.props.addChore(chore, this.props.game)
    this.props.history.push(routes.CHORES)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="form">
        <label className="form__label" htmlFor="title">Chore name:</label>
        <input className="form__input" id="title" type="text" value={this.state.title} onChange={(event) => {this.setState({title: event.target.value})}} />
        <label className="form__label" htmlFor="frequency">Chore frequency (days):</label>
        <input className="form__input" id="frequency" type="number" min="1" max="365" value={this.state.frequency} onChange={(event) => {this.setState({frequency: event.target.value})}} />
        <label className="form__label" htmlFor="pointsPerTime">Points</label>
        <input className="form__input" id="pointsPerTime" type="number" min="1" max="250" value={this.state.pointsPerTime} onChange={(event) => {this.setState({pointsPerTime: event.target.value})}} />
        <div className="form__button-holder">
          <button className="form__button" type="submit">Save Chore</button>
          <Link className="form__button form__button--secondary" to={routes.CHORES}>Back to chores</Link>
        </div>
      </form>
    )
  }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = (state) => ({
  game: state.session.game.gameId
})

const mapDispatchToProps = (dispatch) => {
  return {
    addChore: (chore, game) => dispatch(addChore(chore, game))
  }
}

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(NewChore)
