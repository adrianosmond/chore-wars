import React from 'react';
import { shallow } from 'enzyme';
import * as routes from 'constants/routes';
import ChoreForm, { FormQuestion } from './ChoreForm';

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
    expect(shallow(<ChoreForm
      chore={newChore}
      onSubmit={submitHandler}
      currentTime={choreTime}
    />)).toMatchSnapshot();
  });

  it('Renders an existing chore', () => {
    expect(shallow(<ChoreForm
      chore={choreToEdit}
      onSubmit={submitHandler}
      currentTime={choreTime}
    />)).toMatchSnapshot();
  });

  it('Renders a specified question', () => {
    expect(shallow(<ChoreForm
      chore={choreToEdit}
      onSubmit={submitHandler}
      currentTime={choreTime}
      questions={['forgotToLog']}
    />)).toMatchSnapshot();
  });

  it('Handles button clicks', () => {
    const fakeEvent = { preventDefault: () => {} };
    const shallowForm = shallow(<ChoreForm
      chore={choreToEdit}
      onSubmit={submitHandler}
      currentTime={choreTime}
    />);
    shallowForm.find('form').simulate('submit', fakeEvent);
    expect(submitHandler).toHaveBeenCalled();
  });

  describe('First Question', () => {
    const shallowForm = shallow(<ChoreForm
      chore={choreToEdit}
      onSubmit={submitHandler}
      currentTime={choreTime}
    />);
    const prevQuestion = jest.fn();
    const nextQuestion = jest.fn();
    shallowForm.instance().prevQuestion = prevQuestion;
    shallowForm.instance().nextQuestion = nextQuestion;

    beforeEach(() => {
      shallowForm.setState({ currentQuestionId: 'title' });
    });

    it('Should have a back button that links back to the chores page', () => {
      expect(prevQuestion).not.toHaveBeenCalled();
      const button = shallowForm.find('.form__button--secondary');
      expect(button.prop('to')).toBe(routes.CHORES);
      button.simulate('click');
      expect(prevQuestion).not.toHaveBeenCalled();
    });

    it('Should have a continue button that goes to the next question', () => {
      expect(nextQuestion).not.toHaveBeenCalled();
      const button = shallowForm.find('.form__button').last();
      expect(button.text()).toBe('Continue');
      button.simulate('click');
      expect(nextQuestion).toHaveBeenCalledTimes(1);
    });
  });

  describe('In between Questions', () => {
    const shallowForm = shallow(<ChoreForm
      chore={choreToEdit}
      onSubmit={submitHandler}
      currentTime={choreTime}
    />);
    const prevQuestion = jest.fn();
    const nextQuestion = jest.fn();
    shallowForm.instance().prevQuestion = prevQuestion;
    shallowForm.instance().nextQuestion = nextQuestion;

    beforeEach(() => {
      shallowForm.setState({ currentQuestionId: 'frequency' });
    });

    it('Should have a back button that goes back to the previous question', () => {
      expect(prevQuestion).not.toHaveBeenCalled();
      const button = shallowForm.find('.form__button--secondary');
      expect(button.text()).toBe('Back');
      button.simulate('click');
      expect(prevQuestion).toHaveBeenCalledTimes(1);
    });

    it('Should have a continue button that goes to the next question', () => {
      expect(nextQuestion).not.toHaveBeenCalled();
      const button = shallowForm.find('.form__button').last();
      expect(button.text()).toBe('Continue');
      button.simulate('click');
      expect(nextQuestion).toHaveBeenCalledTimes(1);
    });
  });

  describe('Last Question', () => {
    const shallowForm = shallow(<ChoreForm
      chore={choreToEdit}
      onSubmit={submitHandler}
      currentTime={choreTime}
    />);
    const prevQuestion = jest.fn();
    const nextQuestion = jest.fn();
    shallowForm.instance().prevQuestion = prevQuestion;
    shallowForm.instance().nextQuestion = nextQuestion;

    beforeEach(() => {
      shallowForm.setState({ currentQuestionId: 'lastDone' });
    });

    it('Should have a back button that goes back to the previous question', () => {
      expect(prevQuestion).not.toHaveBeenCalled();
      const button = shallowForm.find('.form__button--secondary');
      expect(button.text()).toBe('Back');
      button.simulate('click');
      expect(prevQuestion).toHaveBeenCalledTimes(1);
    });

    it('Should have a save button that saves the chore', () => {
      expect(nextQuestion).not.toHaveBeenCalled();
      const button = shallowForm.find('.form__button').last();
      expect(button.text()).toBe('Save Chore');
      button.simulate('click');
      expect(nextQuestion).toHaveBeenCalledTimes(0);
    });
  });

  describe('FormQuestion', () => {
    const questionChildren = <p id="test-child">Child</p>;
    it('Does not render if the question is not the current question', () => {
      expect(shallow(<FormQuestion id="test" currentQuestionId="not-test" />).html()).toBe(null);
    });

    it('Renders with a label', () => {
      expect(shallow(
        <FormQuestion
          id="test"
          currentQuestionId="test"
          noLabel
          error={false}
          label="label"
        >
          {questionChildren}
        </FormQuestion>,
      )).toMatchSnapshot();
    });

    it('Renders with a div', () => {
      expect(shallow(
        <FormQuestion
          id="test"
          currentQuestionId="test"
          noLabel={false}
          error={false}
          label="label"
        >
          {questionChildren}
        </FormQuestion>,
      )).toMatchSnapshot();
    });

    it('Can display an error', () => {
      expect(shallow(
        <FormQuestion
          id="test"
          currentQuestionId="test"
          noLabel
          error
          label="label"
        >
          {questionChildren}
        </FormQuestion>,
      )).toMatchSnapshot();
    });

    it('Renders children', () => {
      const component = shallow(
        <FormQuestion
          id="test"
          currentQuestionId="test"
          noLabel
          error
          label="label"
        >
          {questionChildren}
        </FormQuestion>,
      );
      const children = component.find('#test-child');
      expect(children.html()).toEqual(shallow(questionChildren).html());
    });
  });
});
