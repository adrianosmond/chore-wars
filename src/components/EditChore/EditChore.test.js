import React from 'react';
import { shallow } from 'enzyme';
import { EditChore } from './index';

const testTime = new Date('2018-02-18').getTime();
const chores = {
  'test-chore': {
    title: 'Test Chore',
    frequency: 1,
    pointsPerTime: 100,
    lastDone: 0,
  },
};
const match = { params: { slug: 'test-chore' } };

describe('Edit Chore', () => {
  it('Renders', () => {
    expect(shallow(<EditChore match={match} chores={chores} currentTime={testTime} />)).toMatchSnapshot();
  });

  it('Should try to load the chores if they havent already been loaded', () => {
    const mockLoadChores = jest.fn();
    expect(shallow(<EditChore match={match} loadChores={mockLoadChores} currentTime={testTime} />)).toMatchSnapshot();
    expect(mockLoadChores).toHaveBeenCalled();
  });
});
