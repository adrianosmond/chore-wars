import React from 'react';
import { shallow } from 'enzyme';
import FormQuestion from './FormQuestion';

describe('FormQuestion', () => {
  const questionChildren = <p id="test-child">Child</p>;
  it('Does not render if the question is not the current question', () => {
    expect(shallow(
      <FormQuestion
        id="test"
        currentQuestionId="not-test"
        error={false}
        label="label"
      >
        {questionChildren}
      </FormQuestion>,
    ).html()).toBe(null);
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
