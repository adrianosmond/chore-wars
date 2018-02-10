import { database } from '../lib/firebase';
import { sortByCurrentPoints, processChore } from '../constants/utils'

export function addChore (newChore) {
  return {
    type: 'ADD_CHORE',
    newChore
  }
}

export function completeChore (chore) {
  return {
    type: 'COMPLETE_CHORE',
    chore
  }
}

export function removeChore (chore) {
  return {
    type: 'REMOVE_CHORE',
    chore
  }
}

export function setChores (chores) {
  return {
    type: 'SET_CHORES',
    chores
  }
}

export function loadChores (game) {
  return (dispatch) => {
    database.ref(`games/${game}/chores`).once('value', (result) => {
      const chores = result.val()
      let processedChores = chores.map((chore) => {
        return {
          ...chore,
          ...processChore(chore)
        }
      })

      processedChores.sort(sortByCurrentPoints)
      dispatch(setChores(processedChores))
    })
  }
}
