import { database } from '../lib/firebase'
import { TIME_UNIT } from '../constants/constants'

export default function choresReducer(state = { chores: [] }, action) {
  let newState = { ...state }

  switch (action.type) {
    case 'ADD_CHORE':
      newState.chores = [
        ...state.chores,
        action.newChore
      ]

      database.ref(`games/${action.game}/chores/${action.slug}`).set(action.newChore)

      return newState

    case 'RESET_CHORE_DONE_DATE':
      const now = new Date().getTime()
      const completedChore = {
        ...action.chore,
        lastDone: now,
        due: now + (action.chore.frequency * TIME_UNIT),
        currentPoints: 0,
        percentage: 0
      }

      newState.chores[action.slug] = completedChore

      database.ref(`games/${action.game}/chores/${action.slug}`).set(completedChore)
      return newState

    case 'REMOVE_CHORE':
      const chores = {
        ...newState.chores
      }
      delete chores[action.slug]
      newState.chores = chores
      database.ref(`games/${action.game}/chores/${action.slug}`).set(null)
      return newState

    case 'UPDATE_CHORE':
      newState.chores[action.newSlug] = action.newChore
      database.ref(`games/${action.game}/chores/${action.newSlug}`).set(action.newChore)

      if (action.slug !== action.newSlug) {
        delete newState.chores[action.slug]
        database.ref(`games/${action.game}/chores/${action.slug}`).set(null)
      }
      return newState

    case 'SET_CHORES':
      newState.chores = action.chores
      return newState

    default:
      return state
  }
}
