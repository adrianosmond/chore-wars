import React, { useCallback, useState } from 'react';
import { format } from 'date-fns';
import { victoryPaidBack } from 'database/players';
import { usePlayersObj, useGame } from 'contexts/game';
import { DATE_FORMAT } from 'constants/constants';
import useAsyncMessages from 'hooks/useAsyncMessages';
import UnstyledList from 'components/UnstyledList';
import ActivityLog from 'components/ActivityLog';
import LinkButton from 'components/LinkButton';

const getPlayerName = (id, players) => players[id].name;

const WinsAndLossesContainer = ({
  winsAndLosses,
  currentPlayerId,
  setDebtPaidBack,
}) => {
  const game = useGame();
  const players = usePlayersObj();

  const [isBusy, setIsBusy] = useState(false);
  const { Messages, showErrorMessage } = useAsyncMessages();

  const payBackDebt = useCallback(
    id => {
      setIsBusy(true);
      return victoryPaidBack(game, id)
        .then(() => setDebtPaidBack(id))
        .catch(() => showErrorMessage())
        .then(() => setIsBusy(false));
    },
    [game, setDebtPaidBack, showErrorMessage],
  );

  return (
    <>
      <Messages />
      <UnstyledList spacing="s">
        {winsAndLosses.map(item => {
          const winner = getPlayerName(item.winner, players);
          const loser = getPlayerName(item.loser, players);
          return (
            <UnstyledList.Item key={item.key}>
              <ActivityLog
                date={item.dateWon}
                description={
                  <>
                    {item.winner === currentPlayerId && (
                      <>
                        {winner} beat {loser}.{' '}
                      </>
                    )}
                    {item.winner !== currentPlayerId && (
                      <>
                        {loser} was beaten by {winner}.{' '}
                      </>
                    )}
                    {item.datePaidBack === 0 && (
                      <LinkButton
                        onClick={() => payBackDebt(item.key)}
                        isBusy={isBusy}
                      >
                        Mark this debt as paid back
                      </LinkButton>
                    )}
                    {item.datePaidBack > 0 &&
                      `This was paid back on ${format(
                        item.datePaidBack,
                        DATE_FORMAT,
                      )}.`}
                  </>
                }
              />
            </UnstyledList.Item>
          );
        })}
      </UnstyledList>
    </>
  );
};

export default WinsAndLossesContainer;
