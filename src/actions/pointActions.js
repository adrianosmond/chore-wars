import { database } from '../lib/firebase';

export function addPointsToUser (user, points) {
  return {
    type: 'ADD_POINTS',
    user,
    points
  }
}

export function setPoints (points) {
  return {
    type: 'SET_POINTS',
    points
  }
}

export function loadPoints (game) {
  return (dispatch) => {
    database.ref(`games/${game}/points`).once('value', (result) => {
      dispatch(setPoints(result.val()))
    })
  }
}
