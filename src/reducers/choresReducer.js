import { database } from '../lib/firebase'
import { TIME_UNIT } from '../constants/constants'

export default function choresReducer(state = { chores: [] }, action) {
  let newState = {...state};

  switch (action.type) {
    case 'ADD_CHORE':
      newState.chores = [
        ...state.chores.slice(),
        action.newChore
      ]
      return newState

    case 'RESET_CHORE_DONE_DATE':
      const updateIndex = state.chores.indexOf(action.chore)
      if (updateIndex<0) return state

      const now = new Date().getTime()
      const completedChore = {
        ...action.chore,
        lastDone: now,
        due: now + (action.chore.frequency * TIME_UNIT),
        currentPoints: 0,
        percentage: 0
      }

      newState.chores = [
        ...state.chores.slice(0, updateIndex),
        ...state.chores.slice(updateIndex + 1),
        completedChore
      ]

      database.ref(`games/${action.game}/chores`).set(newState.chores)
      return newState

    case 'REMOVE_CHORE':
      const removeIndex = state.chores.indexOf(action.chore)
      if (removeIndex<0) return state

      newState.chores = [
        ...state.chores.slice(0, removeIndex),
        ...state.chores.slice(removeIndex + 1)
      ]
      return newState

    case 'SET_CHORES':
      newState.chores = action.chores
      return newState

    default:
      return state
  }
}
