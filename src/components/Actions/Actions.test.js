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
  it('Renders', () => {
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

    const actionsComponent = shallow(<Actions store={store} />).dive();
    expect(actionsComponent).toMatchSnapshot();
  });

  describe('Undoing', () => {
    it('is enabled when there is a history', () => {
      const store = mockStore({
        chores: {
          past: [{}, {}],
          present: {
            'test-chore-1': {},
          },
        },
        session,
      });

      const actionsComponent = shallow(<Actions store={store} />).dive();
      const undoButton = actionsComponent.find('#actions-undo');
      expect(undoButton.prop('disabled')).toBe(false);
    });

    it('calls undo and saves the state when it is clicked', () => {
      const store = mockStore({
        chores: {
          past: [{}, {}],
          present: {
            'test-chore-1': {},
          },
        },
        session,
      });

      const actionsComponent = shallow(<Actions store={store} />).dive();
      const undoButton = actionsComponent.find('#actions-undo');

      const undo = jest.fn();
      const saveStatePostUndo = jest.fn();
      actionsComponent.setProps({
        undo,
        saveStatePostUndo,
      });

      expect(undo).not.toHaveBeenCalled();
      expect(saveStatePostUndo).not.toHaveBeenCalled();
      undoButton.simulate('click');
      expect(undo).toHaveBeenCalledTimes(1);
      expect(saveStatePostUndo).toHaveBeenCalledTimes(1);
    });

    it('is disabled when there is no history', () => {
      const store = mockStore({
        chores: {
          past: [],
          present: {
            'test-chore-1': {},
          },
        },
        session,
      });

      const actionsComponent = shallow(<Actions store={store} />).dive();
      const undoButton = actionsComponent.find('#actions-undo');
      expect(undoButton.prop('disabled')).toBe(true);
    });
  });

  describe('Creating a chain', () => {
    it('is disabled when there are fewer than 2 chores', () => {
      const store = mockStore({
        chores: {
          past: [],
          present: {
            'test-chore-1': {},
          },
        },
        session,
      });

      const actionsComponent = shallow(<Actions store={store} />).dive();
      const chainButton = actionsComponent.find('#actions-create-chain');
      expect(chainButton.length).toBe(0);
    });

    it('is enabled when there are 2 chores', () => {
      const store = mockStore({
        chores: {
          past: [],
          present: {
            'test-chore-1': {},
            'test-chore-2': {},
          },
        },
        session,
      });

      const actionsComponent = shallow(<Actions store={store} />).dive();
      const chainButton = actionsComponent.find('#actions-create-chain');
      expect(chainButton.length).toBe(1);
    });
  });
});
