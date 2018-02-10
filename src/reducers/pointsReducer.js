export default function pointsReducer(state = { points: null }, action) {
  let newState = {...state};

  switch (action.type) {
    case 'ADD_POINTS':
      const { points, user } = action
      newState.points[user] += points
      return newState

    case 'SET_POINTS':
      newState.points = action.points
      return newState

    default:
      return state
  }
}
