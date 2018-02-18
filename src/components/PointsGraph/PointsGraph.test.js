import React from 'react';
import { shallow } from 'enzyme';
import { PointsGraph } from './index';
import { MAX_POINT_DIFFERENCE } from '../../constants/constants';

describe('PointsGraph', () => {
  it('Renders an equal points graph', () => {
    const pointsProps = {
      points: {
        player1: {
          name: 'Player 1',
          points: 100,
        },
        player2: {
          name: 'Player 2',
          points: 100,
        },
      },
    };
    expect(shallow(<PointsGraph { ...pointsProps } />)).toMatchSnapshot();
  });

  it('Renders a points graph with player 1 winning', () => {
    const pointsProps = {
      points: {
        player1: {
          name: 'Player 1',
          points: 200,
        },
        player2: {
          name: 'Player 2',
          points: 100,
        },
      },
    };
    expect(shallow(<PointsGraph { ...pointsProps } />)).toMatchSnapshot();
  });

  it('Renders a points graph with player 2 winning', () => {
    const pointsProps = {
      points: {
        player1: {
          name: 'Player 1',
          points: 100,
        },
        player2: {
          name: 'Player 2',
          points: 200,
        },
      },
    };
    expect(shallow(<PointsGraph { ...pointsProps } />)).toMatchSnapshot();
  });

  it('Renders a points graph with a difference of > MAX with p1 winning', () => {
    const p2Score = 100;
    const pointsProps = {
      points: {
        player1: {
          name: 'Player 1',
          points: p2Score + MAX_POINT_DIFFERENCE + 100,
        },
        player2: {
          name: 'Player 2',
          points: p2Score,
        },
      },
    };
    expect(shallow(<PointsGraph { ...pointsProps } />)).toMatchSnapshot();
  });

  it('Renders a points graph with a difference of > MAX with p2 winning', () => {
    const p1Score = 100;
    const pointsProps = {
      points: {
        player1: {
          name: 'Player 1',
          points: p1Score,
        },
        player2: {
          name: 'Player 2',
          points: p1Score + MAX_POINT_DIFFERENCE + 100,
        },
      },
    };
    expect(shallow(<PointsGraph { ...pointsProps } />)).toMatchSnapshot();
  });
});
