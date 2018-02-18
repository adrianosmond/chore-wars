import React from 'react';
import { shallow } from 'enzyme';
import ChoreForm from './index';

const now = new Date().getTime();
const choreToEdit = {
  title: 'Test Chore',
  slug: 'test-chore',
  frequency: 1,
  pointsPerTime: 100,
  lastDone: now,
};
const newChore = {
  title: '',
  slug: '',
  frequency: 7,
  pointsPerTime: 10,
  lastDone: now,
};
const submitHandler = jest.fn();

describe('Chore Form', () => {
  it('Renders a new chore', () => {
    expect(shallow(<ChoreForm chore={newChore} onSubmit={submitHandler} />)).toMatchSnapshot();
  });

  it('Renders an existing chore', () => {
    expect(shallow(<ChoreForm chore={choreToEdit} onSubmit={submitHandler} />)).toMatchSnapshot();
  });

  it('Handles button clicks', () => {
    const fakeEvent = { preventDefault: () => {} };
    const shallowForm = shallow(<ChoreForm chore={choreToEdit} onSubmit={submitHandler} />);
    shallowForm.find('form').simulate('submit', fakeEvent);
    expect(submitHandler).toHaveBeenCalled();
  });
});
