import React, { useCallback } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { victoryPaidBack } from 'database/players';
import { usePlayersObj, useGame } from 'contexts/game';
import UnstyledList from 'components/UnstyledList';
import ActivityLog from 'components/ActivityLog';
import LinkButton from 'components/LinkButton';
import { DATE_FORMAT } from 'constants/constants';
import routes from 'constants/routes';

const getPlayerName = (id, players) => players[id].name;

const WinsAndLossesContainer = ({ winsAndLosses, currentPlayerId }) => {
  const game = useGame();
  const history = useHistory();
  const players = usePlayersObj();
  const payBackDebt = useCallback(
    id => victoryPaidBack(game, id).then(() => history.push(routes.HOME)),
    [game, history],
  );

  return (
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
                    <LinkButton onClick={() => payBackDebt(item.key)}>
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
  );
};

export default WinsAndLossesContainer;
