import React from 'react';
import { shallow } from 'enzyme';
import { processChore } from 'constants/utils';

import ChoresList from './ChoresList';

const choreProps = {
  user: 'test-user',
  game: 'game',
  allChores: {},
};

describe('ChoresList', () => {
  it('Renders an empty list', () => {
    const component = shallow(
      <ChoresList
        chores={[]}
        {...choreProps}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('Renders a list', () => {
    const now = new Date('2018-02-20').getTime();
    const list = [{
      ...processChore({
        frequency: 1,
        lastDone: new Date('2018-02-18').getTime(),
        pointsPerTime: 100,
        title: 'Chore 1',
      }, 'chore-1', now),
    }, {
      ...processChore({
        frequency: 0,
        lastDone: new Date('2018-02-19').getTime(),
        pointsPerTime: 10,
        title: 'Chore 2',
      }, 'chore-2', now),
    }];

    const component = shallow(
      <ChoresList
        chores={list}
        {...choreProps}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
