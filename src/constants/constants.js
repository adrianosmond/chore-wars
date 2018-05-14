const TIME_UNIT = 1000 * 60 * 60 * 24; // 1 day
const MIN_CHORE_FREQUENCY = 1;
const MAX_CHORE_FREQUENCY = 365;
const MIN_CHORE_POINTS = 1;
const MAX_CHORE_POINTS = 200;

const DATE_FORMAT = 'DD/MM/YYYY';

const MAX_POINT_DIFFERENCE = 500;

const MAX_NAME_LENGTH = 10;
const JOIN_CODE_LENGTH = 8;

const ActionTypes = {
  addChore: 'ADD_CHORE',
  resetChoreDoneDate: 'RESET_CHORE_DONE_DATE',
  blockChore: 'BLOCK_CHORE',
  unblockChore: 'UNBLOCK_CHORE',
  removeChore: 'REMOVE_CHORE',
  updateChore: 'UPDATE_CHORE',
  setChores: 'SET_CHORES',
  makeChain: 'MAKE_CHAIN',
  breakChain: 'BREAK_CHAIN',
  addPoints: 'ADD_POINTS',
  claimPrize: 'CLAIM_PRIZE',
  paidDebt: 'PAID_DEBT',
  setPoints: 'SET_POINTS',
  setPlayers: 'SET_PLAYERS',
  setPlayerName: 'SET_PLAYER_NAME',
  setPlayerAvatar: 'SET_PLAYER_AVATAR',
  savePlayerName: 'SAVE_PLAYER_NAME',
  savePlayerAvatar: 'SAVE_PLAYER_AVATAR',
  setAuthUser: 'SET_AUTH_USER',
  setGame: 'SET_GAME',
  setPlayersLoaded: 'SET_PLAYERS_LOADED',
  setPointsLoaded: 'SET_POINTS_LOADED',
  setChoresLoaded: 'SET_CHORES_LOADED',
  saveStatePostUndo: 'SAVE_STATE_POST_UNDO',
};

const DEFAULT_POINTS_DATA = {
  isOwed: 0,
  points: 0,
}

export {
  TIME_UNIT,
  MIN_CHORE_FREQUENCY,
  MAX_CHORE_FREQUENCY,
  MIN_CHORE_POINTS,
  MAX_CHORE_POINTS,
  MAX_NAME_LENGTH,
  JOIN_CODE_LENGTH,
  DATE_FORMAT,
  MAX_POINT_DIFFERENCE,
  ActionTypes,
  DEFAULT_POINTS_DATA,
};
