import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import Actions from './Actions';

const mockStore = configureMockStore([thunk]);
const session = {
  authUser: {
    uid: 'test-user',
  },
  game: {
    gameId: 'test-game',
  },
};

describe('Actions', () => {
  it('Renders the actions', () => {
    const store = mockStore({
      chores: {
        past: [],
        present: {
          'test-chore-1': {},
          'test-chore-2': {},
          'test-chore-3': {},
        },
      },
      session,
    });
    expect(shallow(<Actions store={store} />)).toMatchSnapshot();
  });

  it('Renders the actions when undoing is possible', () => {
    const store = mockStore({
      chores: {
        past: [{}, {}],
        present: {
          'test-chore-1': {},
          'test-chore-2': {},
          'test-chore-3': {},
        },
      },
      session,
    });
    expect(shallow(<Actions store={store} />)).toMatchSnapshot();
  });

  it('Renders the actions when creating a chain is impossible', () => {
    const store = mockStore({
      chores: {
        past: [{}, {}],
        present: {
          'test-chore-1': {},
        },
      },
      session,
    });
    expect(shallow(<Actions store={store} />)).toMatchSnapshot();
  });
});
