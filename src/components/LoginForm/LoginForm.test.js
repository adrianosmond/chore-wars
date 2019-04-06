import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('Renders', () => {
    expect(shallow(
      <LoginForm loggedIn={jest.fn()} />,
    )).toMatchSnapshot();
  });
});
