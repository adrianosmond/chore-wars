import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import Scores from './Scores';

const mockStore = configureMockStore([thunk]);

describe('Scores', () => {
  it('Renders an equal points graph', () => {
    const store = mockStore({
      points: {
        present: {
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
        },
      },
      session: {
        authUser: 'player1',
        game: {
          gameId: 'test-game',
        },
      },
    });
    expect(shallow(<Scores store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with player 1 winning', () => {
    const store = mockStore({
      points: {
        present: {
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
        },
      },
      session: {
        authUser: 'player1',
        game: {
          gameId: 'test-game',
        },
      },
    });
    expect(shallow(<Scores store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with player 2 winning', () => {
    const store = mockStore({
      points: {
        present: {
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
        },
      },
      session: {
        authUser: 'player1',
        game: {
          gameId: 'test-game',
        },
      },
    });
    expect(shallow(<Scores store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with a difference of > MAX with p1 winning', () => {
    const p2Score = 100;
    const store = mockStore({
      points: {
        present: {
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
        },
      },
      session: {
        authUser: 'player1',
        game: {
          gameId: 'test-game',
        },
      },
    });
    expect(shallow(<Scores store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with a difference of > MAX with p2 winning', () => {
    const p1Score = 100;
    const store = mockStore({
      points: {
        present: {
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
        },
      },
      session: {
        authUser: 'player1',
        game: {
          gameId: 'test-game',
        },
      },
    });
    expect(shallow(<Scores store={store} />).dive()).toMatchSnapshot();
  });
});
