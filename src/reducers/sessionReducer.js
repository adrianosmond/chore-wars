import { ActionTypes } from 'constants/constants';

export const INITIAL_STATE = {
  authUser: null,
  game: null,
  holiday: null,
  playersLoaded: false,
  pointsLoaded: false,
  choresLoaded: false,
};

export default function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.setAuthUser:
      return {
        ...state,
        authUser: action.authUser,
      };

    case ActionTypes.setGame:
      return {
        ...state,
        game: action.game,
      };

    case ActionTypes.setPlayersLoaded:
      return {
        ...state,
        playersLoaded: action.playersLoaded,
      };

    case ActionTypes.setPointsLoaded:
      return {
        ...state,
        pointsLoaded: action.pointsLoaded,
      };

    case ActionTypes.setChoresLoaded:
      return {
        ...state,
        choresLoaded: action.choresLoaded,
      };

    case ActionTypes.setHoliday:
      return {
        ...state,
        holiday: action.holiday,
      };

    default:
      return state;
  }
}
