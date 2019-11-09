import { useState, useEffect } from 'react';
import { useGame, usePlayers } from 'contexts/game';
import useChore from 'hooks/useChore';
import {
  getChoreEdits,
  getChoreCompletions,
  getChoreCompletionRatio,
  getChoreTimeDifferences,
} from 'database/history';

export default id => {
  const game = useGame();
  const players = usePlayers();
  const [chore] = useChore(id);
  const [details, setDetails] = useState({
    chore,
    completions: [],
    completionRatio: [],
    timeDifferences: [],
    edits: [],
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      getChoreCompletions(game, id),
      getChoreCompletionRatio(game, id, players),
      getChoreTimeDifferences(game, id),
      getChoreEdits(game, id),
    ]).then(([completions, completionRatio, timeDifferences, edits]) => {
      setDetails({
        chore,
        completions,
        completionRatio,
        timeDifferences,
        edits,
        loading: false,
      });
    });
  }, [chore, game, id, players]);

  return details;
};
