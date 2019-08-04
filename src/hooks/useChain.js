import { useReducer, useCallback, useMemo } from 'react';
import { useGame, useChores } from 'contexts/game';
import { makeChain, removeChainFeatures } from 'database/chores';

const createInitialState = chores => {
  // Find all chores that are in chains but not waiting
  // (we'll choose for these to be the start of our existing chains)
  // Then from each start point, loop around the chain
  // picking up all the chores that follow on from the first
  return {
    chains: chores
      .filter(chore => chore.isWaiting === false)
      .map(chore => {
        const chain = [];
        let currentChore = chore;
        const getNextChore = c => c.id === currentChore.enables;
        while (!chain.includes(currentChore)) {
          chain.push(currentChore);
          currentChore = chores.find(getNextChore);
        }
        return {
          chores: chain,
        };
      }),
  };
};

const actionTypes = {
  CREATE_CHAIN: 'CREATE_CHAIN',
  REMOVE_CHAIN: 'REMOVE_CHAIN',
  ADD_CHORE_TO_CHAIN: 'ADD_CHORE_TO_CHAIN',
  REMOVE_CHORE_FROM_CHAIN: 'REMOVE_CHORE_FROM_CHAIN',
};

const chainReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHAIN: {
      return {
        ...state,
        chains: [
          ...state.chains,
          {
            chores: [],
          },
        ],
      };
    }

    case actionTypes.REMOVE_CHAIN: {
      return {
        ...state,
        chains: state.chains.filter((c, idx) => idx !== action.payload.chainId),
      };
    }

    case actionTypes.ADD_CHORE_TO_CHAIN: {
      const { chore, chainId } = action.payload;
      return {
        ...state,
        chains: state.chains.map((chain, idx) => {
          if (idx !== chainId) return chain;
          return {
            chores: [...chain.chores, chore],
          };
        }),
      };
    }

    case actionTypes.REMOVE_CHORE_FROM_CHAIN: {
      const { chore, chainId } = action.payload;
      return {
        ...state,
        chains: state.chains.map((chain, idx) => {
          if (idx !== chainId) return chain;
          return {
            chores: chain.chores.filter(c => c !== chore),
          };
        }),
      };
    }

    default:
      throw new Error(`Unrecognised action: ${action.type}`);
  }
};

export default () => {
  const chores = useChores();
  const game = useGame();
  const [state, dispatch] = useReducer(
    chainReducer,
    chores,
    createInitialState,
  );

  const createChain = useCallback(
    () => dispatch({ type: actionTypes.CREATE_CHAIN }),
    [],
  );

  const removeChain = useCallback(
    chainId =>
      dispatch({ type: actionTypes.REMOVE_CHAIN, payload: { chainId } }),
    [],
  );

  const addChoreToChain = useCallback(
    (chore, chainId) =>
      dispatch({
        type: actionTypes.ADD_CHORE_TO_CHAIN,
        payload: { chore, chainId },
      }),
    [],
  );

  const removeChoreFromChain = useCallback(
    (chore, chainId) =>
      dispatch({
        type: actionTypes.REMOVE_CHORE_FROM_CHAIN,
        payload: { chore, chainId },
      }),
    [],
  );

  const availableChores = useMemo(() => {
    const chainedChores = state.chains.map(c => c.chores).flat();
    return chores
      .filter(chore => !chainedChores.includes(chore))
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [chores, state.chains]);

  const saveChains = useCallback(() => {
    return Promise.all(
      availableChores.map(chore => removeChainFeatures(game, chore)),
      state.chains.map(chain => makeChain(game, chain.chores)),
    );
  }, [game, state.chains, availableChores]);

  return {
    ...state,
    availableChores,
    createChain,
    removeChain,
    saveChains,
    addChoreToChain,
    removeChoreFromChain,
  };
};
