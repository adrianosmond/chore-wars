import { useState, useEffect } from 'react';
import { useGame, usePlayers } from 'contexts/game';
import {
  getChoreEdits,
  getChoreCompletions,
  getChoreCompletionRatio,
  getChoreTimeDifferences,
} from 'database/history';

export default id => {
  const game = useGame();
  const players = usePlayers();
  const [details, setDetails] = useState({
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
        completions,
        completionRatio,
        timeDifferences,
        edits,
        loading: false,
      });
    });
  }, [game, id, players]);

  return details;
};
