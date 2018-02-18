import React from 'react';
import { shallow } from 'enzyme';
import { ChoreMenu } from './index';

describe('Chore Form', () => {
  const shallowChoreMenu = shallow(<ChoreMenu slug={'test-chore'} />);
  it('Renders a new chore menu', () => {
    expect(shallowChoreMenu).toMatchSnapshot();
  });

  it('Can be toggled', () => {
    const toggleButton = shallowChoreMenu.find('.chore-menu__button');
    toggleButton.simulate('click');
    expect(shallowChoreMenu.state().visible).toBe(true);
    expect(shallowChoreMenu).toMatchSnapshot();
    toggleButton.simulate('click');
    expect(shallowChoreMenu.state().visible).toBe(false);
  });
});
