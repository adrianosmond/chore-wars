import { ActionTypes } from '../constants/constants';

export default function sessionReducer(state = {
  authUser: null, game: null, pointsLoaded: false, choresLoaded: false,
}, action) {
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

    default:
      return state;
  }
}
