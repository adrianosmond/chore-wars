import React from 'react';
import { shallow } from 'enzyme';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import Scores from './Scores';

describe('Scores', () => {
  it('Renders an equal points graph', () => {
    expect(shallow(
      <Scores
        gameId="test-game"
        points={{
          player1: {
            name: 'Player 1',
            points: 100,
            isOwed: 0,
          },
          player2: {
            name: 'Player 2',
            points: 100,
            isOwed: 0,
          },
        }}
      />,
    )).toMatchSnapshot();
  });

  it('Renders a points graph with player 1 winning', () => {
    expect(shallow(
      <Scores
        gameId="test-game"
        points={{
          player1: {
            name: 'Player 1',
            points: 200,
            isOwed: 0,
          },
          player2: {
            name: 'Player 2',
            points: 100,
            isOwed: 0,
          },
        }}
      />,
    )).toMatchSnapshot();
  });

  it('Renders a points graph with player 2 winning', () => {
    expect(shallow(
      <Scores
        gameId="test-game"
        points={{
          player1: {
            name: 'Player 1',
            points: 100,
            isOwed: 0,
          },
          player2: {
            name: 'Player 2',
            points: 200,
            isOwed: 0,
          },
        }}
      />,
    )).toMatchSnapshot();
  });

  it('Renders a points graph with a difference of > MAX with p1 winning', () => {
    const p2Score = 100;
    expect(shallow(
      <Scores
        gameId="test-game"
        points={{
          player1: {
            name: 'Player 1',
            points: p2Score + MAX_POINT_DIFFERENCE + 100,
            isOwed: 0,
          },
          player2: {
            name: 'Player 2',
            points: p2Score,
            isOwed: 0,
          },
        }}
      />,
    )).toMatchSnapshot();
  });

  it('Renders a points graph with a difference of > MAX with p2 winning', () => {
    const p1Score = 100;
    expect(shallow(
      <Scores
        gameId="test-game"
        points={{
          player1: {
            name: 'Player 1',
            points: p1Score,
            isOwed: 0,
          },
          player2: {
            name: 'Player 2',
            points: p1Score + MAX_POINT_DIFFERENCE + 100,
            isOwed: 0,
          },
        }}
      />,
    )).toMatchSnapshot();
  });
});
