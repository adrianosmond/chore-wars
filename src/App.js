import React, { Component } from 'react'

import SelectUser from './components/SelectUser'
import PointsGraph from './components/PointsGraph'
import ChoresList from './components/ChoresList'

const TIME_UNIT = 1000 * 60 * 60 * 24 // 1 day
const CHORES_KEY = 'savedChoreData'
const USER_KEY = 'choresCurrentUser'

const byCurrentPoints = (a, b) => b.currentPoints - a.currentPoints

const calculateCurrentPointsAndPercentage = (chore) => {
  const timeSinceChore = (new Date().getTime() - chore.lastDone) / TIME_UNIT
  const timeRemaining = timeSinceChore - chore.frequency
  const percentage = Math.min(100 * timeSinceChore / chore.frequency, 100)
  const multiplier = 1 + (1 / chore.frequency)
  return {
    currentPoints: Math.round(percentage / 100 * chore.pointsPerTime * Math.pow(multiplier, timeRemaining)),
    percentage
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      chores: null
    }
  }

  componentWillMount() {
    this.setUser(localStorage.getItem(USER_KEY))
    this.loadChores()
    this.loadPoints()
  }

  setUser(username) {
    this.setState({
      user: username
    })
    if (username) localStorage.setItem(USER_KEY, username)
  }

  getChoresData() {
    const responseTime = 300 + Math.floor(Math.random() *500);
    return new Promise((res, err) => {
      setTimeout(() => {
        try {
          res(JSON.parse(localStorage.getItem(CHORES_KEY)) || [])
        } catch (e) {
          res([])
        }
      }, responseTime)
    })
  }

  loadChores() {
    this.getChoresData().then((chores) => {
      let choresWithCurrentPoints = chores.map((chore) => {
        return {
          ...chore,
          ...calculateCurrentPointsAndPercentage(chore)
        }
      })

      choresWithCurrentPoints.sort(byCurrentPoints)

      this.setState({
        chores: choresWithCurrentPoints
      })
    })
  }

  saveChores(chores) {
    const sanitisedChores = chores.map((chore) => {
      let sanitisedChore = { ...chore }
      delete sanitisedChore.currentPoints
      delete sanitisedChore.percentage
      return sanitisedChore
    })

    localStorage.setItem(CHORES_KEY, JSON.stringify(sanitisedChores))
  }

  loadPoints() {
    this.getPointsData().then((points) => {

      this.setState({
        points
      })
    })
  }

  getPointsData() {
    const responseTime = 300 + Math.floor(Math.random() *500);
    return new Promise((res, err) => {
      setTimeout(() => {
        try {
          res({
            adrianPoints: 100,
            dinaPoints: 150,
            maxPoints: 500
          })
        } catch (e) {
          res([])
        }
      }, responseTime)
    })
  }

  completeChore(chore) {
    const { chores } = this.state
    const choreIdx = chores.indexOf(chore)
    const completedChore = {
      ...chore,
      lastDone: new Date().getTime(),
      currentPoints: 0,
      percentage: 0
    }

    const newChores = [
      ...chores.slice(0, choreIdx),
      ...chores.slice(choreIdx + 1),
      completedChore
    ]
    this.setState({
      chores: newChores
    })
    this.saveChores(newChores)
  }

  render() {
    const {chores, user, points} = this.state
    if (!user) return <SelectUser selectUser={this.setUser.bind(this)} />;
    return (
      <div className="chores">
        { points ? <PointsGraph points={points}/> : null }
        { chores ? <ChoresList chores={chores} completeChore={this.completeChore.bind(this)} /> : null }
      </div>
    )
  }
}

export default App
