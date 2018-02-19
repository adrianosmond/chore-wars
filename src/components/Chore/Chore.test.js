import React from 'react';
import { shallow } from 'enzyme';
import { processChore, makeSlug } from '../../constants/utils';
import { Chore } from './index';

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
  user: 'test-user',
  game: 'test-game',
  markChoreComplete: jest.fn(),
};

describe('Chore', () => {
  it('Renders a basic chore', () => {
    expect(shallow(<Chore { ...choreProps } />)).toMatchSnapshot();
  });

  it('Renders a chore with frequency 0', () => {
    const props = {
      ...choreProps,
      chore: processChore({
        ...chore,
        frequency: 0,
      }, slug, choreTime),
    };
    expect(shallow(<Chore { ...props } />)).toMatchSnapshot();
  });

  it('Should handle clicks on the complete button', () => {
    const completeFn = jest.fn();
    const props = {
      ...choreProps,
      markChoreComplete: completeFn,
    };
    const shallowChore = shallow(<Chore { ...props } />);
    shallowChore.find('button').simulate('click');
    expect(completeFn).toHaveBeenCalled();
  });
});
