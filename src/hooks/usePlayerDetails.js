import { useState, useEffect } from 'react';
import { useGame, usePlayersObj } from 'contexts/game';
import { getPlayerCompletions } from 'database/history';

export default id => {
  const game = useGame();
  const player = usePlayersObj()[id];
  const [details, setDetails] = useState({
    player,
    completions: [],
    loading: true,
  });

  useEffect(() => {
    Promise.all([getPlayerCompletions(game, id)]).then(([completions]) => {
      setDetails({
        player,
        completions,
        loading: false,
      });
    });
  }, [player, game, id]);

  return details;
};
