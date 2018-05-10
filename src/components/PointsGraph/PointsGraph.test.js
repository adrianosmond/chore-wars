import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import PointsGraph from './PointsGraph';
import { MAX_POINT_DIFFERENCE } from '../../constants/constants';

const mockStore = configureMockStore([thunk]);

describe('PointsGraph', () => {
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with p1 being owed', () => {
    const p2Score = 100;
    const store = mockStore({
      points: {
        present: {
          player1: {
            name: 'Player 1',
            points: p2Score + MAX_POINT_DIFFERENCE + 100,
            isOwed: 1,
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with p2 being owed', () => {
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
            isOwed: 1,
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with p1 being owed > 1', () => {
    const p2Score = 100;
    const store = mockStore({
      points: {
        present: {
          player1: {
            name: 'Player 1',
            points: p2Score + MAX_POINT_DIFFERENCE + 100,
            isOwed: 2,
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
  });

  it('Renders a points graph with p2 being owed > 1', () => {
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
            isOwed: 2,
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
    expect(shallow(<PointsGraph store={store} />).dive()).toMatchSnapshot();
  });
});
