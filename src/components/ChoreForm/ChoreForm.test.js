import React from 'react';
import { shallow } from 'enzyme';
import ChoreForm from './index';

const choreTime = new Date('2018-02-18').getTime();
const choreToEdit = {
  title: 'Test Chore',
  slug: 'test-chore',
  frequency: 1,
  pointsPerTime: 100,
  lastDone: choreTime,
};
const newChore = {
  title: '',
  slug: '',
  frequency: 7,
  pointsPerTime: 10,
  lastDone: choreTime,
};
const submitHandler = jest.fn();

describe('Chore Form', () => {
  it('Renders a new chore', () => {
    expect(shallow(<ChoreForm chore={newChore} onSubmit={submitHandler} currentTime={choreTime} />)).toMatchSnapshot();
  });

  it('Renders an existing chore', () => {
    expect(shallow(<ChoreForm chore={choreToEdit} onSubmit={submitHandler} currentTime={choreTime} />)).toMatchSnapshot();
  });

  it('Renders a specified question', () => {
    expect(shallow(<ChoreForm chore={choreToEdit} onSubmit={submitHandler} currentTime={choreTime} questions={['forgotToLog']} />)).toMatchSnapshot();
  });

  it('Handles button clicks', () => {
    const fakeEvent = { preventDefault: () => {} };
    const shallowForm = shallow(<ChoreForm chore={choreToEdit} onSubmit={submitHandler} currentTime={choreTime} />);
    shallowForm.find('form').simulate('submit', fakeEvent);
    expect(submitHandler).toHaveBeenCalled();
  });
});
