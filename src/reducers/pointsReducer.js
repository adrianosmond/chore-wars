import { database } from '../lib/firebase'

export default function pointsReducer(state = { points: null }, action) {
  let newState = {...state};

  switch (action.type) {
    case 'ADD_POINTS':
      const { points, user, game } = action
      const newPoints = {...newState.points}
      newState.points = newPoints
      newPoints[user].points += points

      database.ref(`games/${game}/points/${user}/points`).set(newPoints[user].points)

      return newState

    case 'SET_POINTS':
      newState.points = action.points
      return newState

    default:
      return state
  }
}
