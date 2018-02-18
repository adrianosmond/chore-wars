import React from 'react';
import { shallow } from 'enzyme';
import { ChoreMenu } from './index';

describe('Chore Menu', () => {
  const mockRemoveChore = jest.fn();
  const shallowChoreMenu = shallow(<ChoreMenu slug={'test-chore'} removeChore={mockRemoveChore} />);
  const toggleButton = shallowChoreMenu.find('.js-toggle-menu');
  it('Renders a new chore menu', () => {
    expect(shallowChoreMenu).toMatchSnapshot();
  });
  
  it('Can be toggled', () => {
    toggleButton.simulate('click');
    expect(shallowChoreMenu.state().visible).toBe(true);
    expect(shallowChoreMenu).toMatchSnapshot();
    toggleButton.simulate('click');
    expect(shallowChoreMenu.state().visible).toBe(false);
  });
  
  it('Can remove a chore', () => {
    toggleButton.simulate('click');
    const removeButton = shallowChoreMenu.find('.js-remove-chore');
    removeButton.simulate('click');
    expect(mockRemoveChore).toHaveBeenCalled();
  });
});
