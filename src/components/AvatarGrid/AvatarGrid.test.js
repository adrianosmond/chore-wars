import React from 'react';
import { shallow } from 'enzyme';
import { DefaultAvatar } from 'constants/avatars';

import AvatarGrid from './AvatarGrid';

describe('AvatarGrid', () => {
  it('Renders', () => {
    const component = shallow(<AvatarGrid editing="topType" avatar={DefaultAvatar} onSelect={jest.fn} />);
    expect(component).toMatchSnapshot();
  });
});
