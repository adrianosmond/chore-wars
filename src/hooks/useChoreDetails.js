import { useState, useEffect } from 'react';
import { useGame } from 'contexts/game';
import {
  getChoreEdits,
  getChoreCompletions,
  getChoreCompletionRatio,
} from 'database/history';

export default id => {
  const game = useGame();
  const [details, setDetails] = useState({
    completions: [],
    completionRatio: [],
    edits: [],
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      getChoreCompletions(game, id),
      getChoreCompletionRatio(game, id),
      getChoreEdits(game, id),
    ]).then(([completions, completionRatio, edits]) => {
      setDetails({
        completions,
        completionRatio,
        edits,
        loading: false,
      });
    });
  }, [game, id]);

  return details;
};
