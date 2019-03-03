import { ActionTypes } from 'constants/constants';

export default function choresReducer(state = { }, action) {
  switch (action.type) {
    case ActionTypes.setChores:
      return {
        ...action.chores,
      };

    default:
      return state;
  }
}
