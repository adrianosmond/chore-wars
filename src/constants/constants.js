export const TIME_UNIT = 1000 * 60 * 60 * 24; // 1 day
export const MIN_CHORE_FREQUENCY = 1;
export const MAX_CHORE_FREQUENCY = 365;
export const MIN_CHORE_POINTS = 1;
export const MAX_CHORE_POINTS = 200;
export const MAX_CHORE_CURRENT_POINTS = 1000;

export const DATE_FORMAT = 'DD/MM/YYYY';

export const MAX_POINT_DIFFERENCE = 500;

export const MAX_NAME_LENGTH = 10;
export const JOIN_CODE_LENGTH = 8;

export const ActionTypes = {
  setChores: 'SET_CHORES',
  setPoints: 'SET_POINTS',
  setPlayers: 'SET_PLAYERS',
  setPlayerName: 'SET_PLAYER_NAME',
  setPlayerAvatar: 'SET_PLAYER_AVATAR',
  savePlayerName: 'SAVE_PLAYER_NAME',
  savePlayerAvatar: 'SAVE_PLAYER_AVATAR',
  setAuthUser: 'SET_AUTH_USER',
  setGame: 'SET_GAME',
  setHoliday: 'SET_HOLIDAY',
  setPlayersLoaded: 'SET_PLAYERS_LOADED',
  setPointsLoaded: 'SET_POINTS_LOADED',
  setChoresLoaded: 'SET_CHORES_LOADED',
};

export const DEFAULT_POINTS_DATA = {
  isOwed: 0,
  points: 0,
};
