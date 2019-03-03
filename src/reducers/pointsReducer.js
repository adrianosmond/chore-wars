import { ActionTypes } from 'constants/constants';

export default function pointsReducer(state = { }, action) {
  const { points } = action;

  switch (action.type) {
    case ActionTypes.setPoints:
      return {
        ...points,
      };

    default:
      return state;
  }
}
