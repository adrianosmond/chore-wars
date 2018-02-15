export default function sessionReducer(state = {
  authUser: null, game: null, pointsLoaded: false, choresLoaded: false,
}, action) {
  switch (action.type) {
    case 'SET_AUTH_USER':
      return {
        ...state,
        authUser: action.authUser,
      };

    case 'SET_GAME':
      return {
        ...state,
        game: action.game,
      };

    case 'SET_POINTS_LOADED':
      return {
        ...state,
        pointsLoaded: action.pointsLoaded,
      };

    case 'SET_CHORES_LOADED':
      return {
        ...state,
        choresLoaded: action.choresLoaded,
      };

    default:
      return state;
  }
}
