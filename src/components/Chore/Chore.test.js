import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { processChore, makeSlug } from 'constants/utils';
import Chore from './Chore';

const choreTime = new Date('2018-02-18').getTime();
const chore = {
  frequency: 1,
  lastDone: choreTime,
  pointsPerTime: 100,
  title: 'Test Chore',
};
const slug = makeSlug(chore.title);
const processedChore = processChore(chore, slug, choreTime);
const choreProps = {
  chore: processedChore,
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  chores: {
    [slug]: chore,
  },
  session: {
    authUser: {
      uid: 'test-user',
    },
    game: {
      gameId: 'test-game',
    },
  },
});

describe('Chore', () => {
  it('Renders a basic chore', () => {
    expect(shallow(<Chore store={store} { ...choreProps } />).dive()).toMatchSnapshot();
  });

  it('Renders a chore with frequency 0', () => {
    const props = {
      ...choreProps,
      chore: processChore({
        ...chore,
        frequency: 0,
      }, slug, choreTime),
    };
    expect(shallow(<Chore store={store} { ...props } />).dive()).toMatchSnapshot();
  });

  it('Should handle clicks on the complete button', () => {
    const mountedChore = shallow(<Chore store={store} { ...choreProps } />).dive();

    const completeFn = jest.fn();
    mountedChore.setProps({
      markChoreComplete: completeFn,
    });

    mountedChore.find('.chore__complete-button').simulate('click');
    expect(completeFn).toHaveBeenCalled();
  });
});
