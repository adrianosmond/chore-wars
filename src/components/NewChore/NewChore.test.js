import React from 'react';
import { shallow } from 'enzyme';
import { NewChore } from './index';

describe('Edit Chore', () => {
  const testTime = new Date('2018-02-18').getTime();

  it('Renders', () => {
    shallow(<NewChore currentTime={testTime} />);
  });
});
