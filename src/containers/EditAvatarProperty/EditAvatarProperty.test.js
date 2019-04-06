import React from 'react';
import { shallow } from 'enzyme';
import { DefaultAvatar } from 'constants/avatars';
import EditAvatarProperty from './EditAvatarProperty';

describe('EditAvatarProperty', () => {
  it('Renders', () => {
    expect(shallow(
      <EditAvatarProperty
        user="test-user"
        player={{ avatar: DefaultAvatar }}
        doSetPlayerAvatar={jest.fn()}
        match={{ params: { propertyToEdit: 'topType' } }}
      />,
    ).dive()).toMatchSnapshot();
  });
});
