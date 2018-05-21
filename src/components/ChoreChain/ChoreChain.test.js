import React from 'react';
import { shallow } from 'enzyme';
import { filterAndSortChores } from 'constants/utils';

import ChoreChain, { ChainSelect, ChainOrder } from './ChoreChain';

const chores = filterAndSortChores({
  first: {
    frequency: 7,
    lastDone: 0,
    pointsPerTime: 50,
    title: 'First',
  },
  second: {
    frequency: 0,
    lastDone: 10,
    pointsPerTime: 10,
    title: 'Second',
  },
  third: {
    frequency: 0,
    lastDone: 0,
    pointsPerTime: 20,
    title: 'Third',
  },
  fourth: {
    frequency: 1,
    lastDone: 100,
    pointsPerTime: 100,
    title: 'Fourth',
  },
});

describe('Chore Chain', () => {
  describe('Class', () => {
    const component = shallow(<ChoreChain chores={chores} />);
    it('Renders Selection', () => {
      expect(component).toMatchSnapshot();
    });


    it('Adds/removes a chore to/from the chain on selection', () => {
      const checkbox = component.find(ChainSelect).dive().find('.chore-chain__checkbox').first();
      checkbox.simulate('change', { target: { checked: true } });
      expect(component.state('chain')).toEqual([chores[0]]);
      checkbox.simulate('change', { target: { checked: true } });
      expect(component.state('chain')).toEqual([]);
    });

    it('Renders Sorting', () => {
      component.setState({
        chain: [chores[0], chores[1]],
        stage: 'sorting',
      });
      expect(component).toMatchSnapshot();
    });

    it('Moves chores up', () => {
      const checkbox = component.find(ChainOrder).dive().find('.chore-chain__sort-button').at(2);
      checkbox.simulate('click');
      expect(component.state('chain')).toEqual([chores[1], chores[0]]);
    });

    it('Moves chores down', () => {
      const checkbox = component.find(ChainOrder).dive().find('.chore-chain__sort-button').at(1);
      checkbox.simulate('click');
      expect(component.state('chain')).toEqual([chores[0], chores[1]]);
    });
  });

  describe('Selection', () => {
    const chooseChore = jest.fn();
    const nextStage = jest.fn();
    const component = shallow(<ChainSelect chores={chores} chain={[]}
      chooseChore={chooseChore} canSave={true} nextStage={nextStage} />);

    it('Renders', () => {
      expect(component).toMatchSnapshot();
    });

    it('Handles clicks on checkboxes', () => {
      expect(chooseChore).not.toHaveBeenCalled();
      component.find('.chore-chain__checkbox').first().simulate('change', { target: { checked: true } });
      expect(chooseChore).toHaveBeenCalledTimes(1);
    });

    it('Can go to the next stage', () => {
      expect(nextStage).not.toHaveBeenCalled();
      component.find('.form__button').at(1).simulate('click');
      expect(nextStage).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sorting', () => {
    const moveChoreUp = jest.fn();
    const moveChoreDown = jest.fn();
    const prevStage = jest.fn();
    const saveChain = jest.fn();
    const component = shallow(<ChainOrder chores={chores} chain={[chores[0], chores[1], chores[2]]}
       canSave={true} prevStage={prevStage} saveChain={saveChain}
      moveChoreDown={moveChoreDown} moveChoreUp={moveChoreUp} />);

    it('Renders', () => {
      expect(component).toMatchSnapshot();
    });

    it('Can move chores up (but not the first)', () => {
      expect(moveChoreUp).not.toHaveBeenCalled();
      expect(component.find('.chore-chain__sort-button').first().prop('disabled')).toBe(true);
      component.find('.chore-chain__sort-button').at(2).simulate('click');
      expect(moveChoreUp).toHaveBeenCalledTimes(1);
    });

    it('Can move chores down (but not the last)', () => {
      expect(moveChoreDown).not.toHaveBeenCalled();
      component.find('.chore-chain__sort-button').at(1).simulate('click');
      expect(moveChoreDown).toHaveBeenCalledTimes(1);
      expect(component.find('.chore-chain__sort-button').last().prop('disabled')).toBe(true);
    });

    it('Can go to the previous stage', () => {
      expect(prevStage).not.toHaveBeenCalled();
      component.find('.form__button').first().simulate('click');
      expect(prevStage).toHaveBeenCalledTimes(1);
    });

    it('Can save the chain', () => {
      expect(saveChain).not.toHaveBeenCalled();
      component.find('.form__button').at(1).simulate('click');
      expect(saveChain).toHaveBeenCalledTimes(1);
    });
  });
});
