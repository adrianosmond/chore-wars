import React from 'react';
import { shallow } from 'enzyme';
import { EditChore } from './index';

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
    expect(shallow(<EditChore match={match} chores={chores} />)).toMatchSnapshot();
  });

  it('Should try to load the chores if they havent already been loaded', () => {
    const mockLoadChores = jest.fn();
    expect(shallow(<EditChore match={match} loadChores={mockLoadChores} />)).toMatchSnapshot();
    expect(mockLoadChores).toHaveBeenCalled();
  });
});
