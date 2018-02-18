const TIME_UNIT = 1000 * 60 * 60 * 24; // 1 day

const DATE_FORMAT = 'DD/MM/YYYY';

const MAX_POINT_DIFFERENCE = 500;

const ActionTypes = {
  addChore: 'ADD_CHORE',
  resetChoreDoneDate: 'RESET_CHORE_DONE_DATE',
  blockChore: 'BLOCK_CHORE',
  unblockChore: 'UNBLOCK_CHORE',
  removeChore: 'REMOVE_CHORE',
  updateChore: 'UPDATE_CHORE',
  setChores: 'SET_CHORES',
  addPoints: 'ADD_POINTS',
  setPoints: 'SET_POINTS',
  setAuthUser: 'SET_AUTH_USER',
  setGame: 'SET_GAME',
  setPointsLoaded: 'SET_POINTS_LOADED',
  setChoresLoaded: 'SET_CHORES_LOADED',
};

export {
  TIME_UNIT,
  DATE_FORMAT,
  MAX_POINT_DIFFERENCE,
  ActionTypes,
};
