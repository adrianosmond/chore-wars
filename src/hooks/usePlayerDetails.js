import { useState, useEffect } from 'react';
import { useGame, usePlayersObj } from 'contexts/game';
import { getPlayerCompletions, getPlayerWinsAndLosses } from 'database/history';

export default id => {
  const game = useGame();
  const player = usePlayersObj()[id];
  const [details, setDetails] = useState({
    player,
    completions: [],
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      getPlayerCompletions(game, id),
      getPlayerWinsAndLosses(game, id),
    ]).then(([completions, winsAndLosses]) => {
      setDetails({
        player,
        completions,
        winsAndLosses,
        loading: false,
      });
    });
  }, [player, game, id]);

  return details;
};
