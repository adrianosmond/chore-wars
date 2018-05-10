import React from 'react';
import { shallow } from 'enzyme';
import PopUpMenu from './PopUpMenu';

describe('Popup Menu', () => {
  const mockButtonClick = jest.fn();
  const popUpMenu = shallow(<PopUpMenu options={[
      {
        type: 'link',
        to: '/link/address',
        text: 'link',
      },
      {
        type: 'button',
        onClick: mockButtonClick,
        text: 'link',
      },
    ]}>TRIGGER</PopUpMenu>);
  const toggleButton = popUpMenu.find('[data-test="toggle-menu"]');

  it('Renders a new chore menu', () => {
    expect(popUpMenu).toMatchSnapshot();
  });

  it('Can be toggled', () => {
    toggleButton.simulate('click');
    expect(popUpMenu.state().visible).toBe(true);
    expect(popUpMenu).toMatchSnapshot();
    toggleButton.simulate('click');
    expect(popUpMenu.state().visible).toBe(false);
  });

  it('Can have clickable buttons which close the menu', () => {
    toggleButton.simulate('click');
    expect(popUpMenu.state().visible).toBe(true);
    const button = popUpMenu.find('button.pop-up-menu__item');
    button.simulate('click');
    expect(mockButtonClick).toHaveBeenCalled();
    expect(popUpMenu.state().visible).toBe(false);
  });
});
