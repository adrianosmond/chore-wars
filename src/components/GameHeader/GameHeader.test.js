import React from 'react';
import { shallow } from 'enzyme';
import { DefaultAvatar } from 'constants/avatars';
import GameHeader from './GameHeader';

describe('GameHeader', () => {
  it('Renders', () => {
    expect(shallow(
      <GameHeader
        players={{
          'test-user': {
            name: 'Player 1',
            avatar: DefaultAvatar,
          },
          'test-user-2': {
            name: 'Player 2',
            avatar: DefaultAvatar,
          },
        }}
        points={{}}
        gameId="game"
      />,
    )).toMatchSnapshot();
  });
});
