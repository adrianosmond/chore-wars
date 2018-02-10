export default function sessionReducer(state = { authUser: null, game: null }, action) {
  switch(action.type) {
    case 'SET_AUTH_USER':
      return {
        ...state,
        authUser: action.authUser
      }

    case 'SET_GAME':
      return {
        ...state,
        game: action.game
      }

    default:
      return state;
  }
}
