import { useState, useEffect } from 'react';
import { useGame, usePlayers } from 'contexts/game';
import useChore from 'hooks/useChore';
import {
  getChoreEdits,
  getChoreCompletions,
  getChoreCompletionRatio,
  getChoreTimeDifferences,
} from 'database/history';

const INITIAL_STATE = {
  completions: [],
  completionRatio: [],
  timeDifferences: [],
  edits: [],
  loading: true,
};

export default id => {
  const game = useGame();
  const players = usePlayers();
  const [chore] = useChore(id);
  const [details, setDetails] = useState({
    chore,
    ...INITIAL_STATE,
  });

  useEffect(() => {
    if (!chore) {
      setDetails({
        ...INITIAL_STATE,
        loading: false,
      });
      return () => {};
    }
    Promise.all([
      getChoreCompletions(game, id),
      getChoreCompletionRatio(game, id, players),
      getChoreTimeDifferences(game, id),
      getChoreEdits(game, id),
    ])
      .then(([completions, completionRatio, timeDifferences, edits]) => {
        setDetails({
          chore,
          completions,
          completionRatio,
          timeDifferences,
          edits,
          loading: false,
        });
      })
      .catch(err => console.log(err));
    return () => {};
  }, [chore, game, id, players]);

  return details;
};
