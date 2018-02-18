import React from 'react';
import { shallow } from 'enzyme';
import { NewChore } from './index';

describe('Edit Chore', () => {
  it('Renders', () => {
    shallow(<NewChore />);
  });
});
