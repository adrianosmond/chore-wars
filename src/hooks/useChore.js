import { useMemo, useCallback } from 'react';
import { useGame, useUserId, useChores } from 'contexts/game';
import { updateChore } from 'database/chores';

export default (id) => {
  const user = useUserId();
  const game = useGame();
  const chores = useChores();
  const chore = useMemo(
    () => chores.filter((c) => c.id === id).find((c, idx) => idx === 0),
    [chores, id],
  );

  const onUpdateChore = useCallback(
    (newChore) => updateChore(game, user, chore, newChore),
    [chore, game, user],
  );

  return [chore, onUpdateChore];
};
