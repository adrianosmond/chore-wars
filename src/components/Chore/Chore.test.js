import React from 'react';
import { shallow } from 'enzyme';
import { processChore, makeSlug } from 'constants/utils';
import { completeChore } from 'utils/database';
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
  user: 'test-user',
  game: 'game',
};


describe('Chore', () => {
  it('Renders a basic chore', () => {
    expect(shallow(
      <Chore
        {...choreProps}
      />,
    )).toMatchSnapshot();
  });

  it('Renders a chore with frequency 0', () => {
    const props = {
      ...choreProps,
      chore: processChore({
        ...chore,
        frequency: 0,
      }, slug, choreTime),
    };
    expect(shallow(
      <Chore
        {...props}
      />,
    )).toMatchSnapshot();
  });

  it('Should handle clicks on the complete button', () => {
    const mountedChore = shallow(
      <Chore
        {...choreProps}
      />,
    );

    expect(completeChore).not.toHaveBeenCalled();
    mountedChore.find('.chore__complete-button').simulate('click');
    expect(completeChore).toHaveBeenCalledTimes(1);
  });
});
