import { useMemo, useCallback } from 'react';

import { useUser } from 'contexts/user';
import { useGame } from 'contexts/game';
import { useChores } from 'contexts/chores';
import { updateChore } from 'database/chores';

export default id => {
  const user = useUser();
  const game = useGame();
  const chores = useChores();
  const chore = useMemo(
    () => chores.filter(c => c.id === id).find((c, idx) => idx === 0),
    [chores, id],
  );

  const onUpdateChore = useCallback(
    newChore => updateChore(game, user, id, newChore),
    [id, game, user],
  );

  return [chore, onUpdateChore];
};
