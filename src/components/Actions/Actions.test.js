import React from 'react';
import { shallow } from 'enzyme';
import Button from 'components/Button';
import Actions from './Actions';

const mockUndo = jest.fn();

describe('Actions', () => {
  it('Renders', () => {
    const actionsComponent = shallow(
      <Actions
        numChores={3}
        canUndo
        undo={mockUndo}
      />,
    );
    expect(actionsComponent).toMatchSnapshot();
  });

  describe('Undoing', () => {
    it('is enabled when there is a history', () => {
      const actionsComponent = shallow(
        <Actions
          numChores={3}
          canUndo
          undo={mockUndo}
        />,
      );
      const undoButton = actionsComponent.find(Button).at(2);
      expect(undoButton.prop('disabled')).toBe(false);
    });

    it('calls undo and saves the state when it is clicked', () => {
      const actionsComponent = shallow(
        <Actions
          numChores={3}
          canUndo
          undo={mockUndo}
        />,
      );
      const undoButton = actionsComponent.find(Button).at(2);

      expect(mockUndo).not.toHaveBeenCalled();
      undoButton.simulate('click');
      expect(mockUndo).toHaveBeenCalledTimes(1);
    });

    it('is disabled when there is no history', () => {
      const actionsComponent = shallow(
        <Actions
          numChores={3}
          canUndo={false}
          undo={mockUndo}
        />,
      );
      const undoButton = actionsComponent.find(Button).at(2);
      expect(undoButton.prop('disabled')).toBe(true);
    });
  });

  describe('Creating a chain', () => {
    it('is disabled when there are fewer than 2 chores', () => {
      const actionsComponent = shallow(
        <Actions
          numChores={1}
          canUndo
          undo={mockUndo}
        />,
      );
      const buttons = actionsComponent.find(Button);
      expect(buttons.length).toBe(3);
    });

    it('is enabled when there are 2 chores', () => {
      const actionsComponent = shallow(
        <Actions
          numChores={3}
          canUndo
          undo={mockUndo}
        />,
      );
      const buttons = actionsComponent.find(Button);
      expect(buttons.length).toBe(4);
    });
  });
});
