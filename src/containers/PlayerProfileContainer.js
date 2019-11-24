import React from 'react';
import usePlayerDetails from 'hooks/usePlayerDetails';
import CompletionHistoryContainer from 'containers/CompletionHistoryContainer';
import Loading from 'components/Loading';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Typography from 'components/Typography';
import InfoPanel from 'components/InfoPanel';
import { BroomIcon, SprayIcon } from 'components/Icon';
import WinsAndLossesContainer from './WinsAndLossesContainer';

export default ({ id }) => {
  const { player, completions, winsAndLosses, loading } = usePlayerDetails(id);

  if (loading) {
    return <Loading showText={false} />;
  }

  return (
    <>
      <Typography as="h1" appearance="h1">
        {player.name}
      </Typography>
      <Spacer>
        {completions.length > 0 ? (
          <Card title="Recent completions">
            <CompletionHistoryContainer
              history={completions}
              highlightChoreName={true}
            />
          </Card>
        ) : (
          <InfoPanel
            Icon={BroomIcon}
            title="No completions yet"
            description={`Eventually completion stats will show up here,
              but it looks like ${player.name} hasn't completed any chores yet.`}
          />
        )}
        {winsAndLosses.length > 0 ? (
          <Card title="Wins and losses">
            <WinsAndLossesContainer
              winsAndLosses={winsAndLosses}
              currentPlayerId={id}
            />
          </Card>
        ) : (
          /* Don't show two InfoPanel's
           - only show this one if we aren't showing the other */
          completions.length > 0 && (
            <InfoPanel
              Icon={SprayIcon}
              title="No wins or losses yet"
              description={`It looks like ${player.name} hasn't won or lost yet. 
                When ${player.name} beats or is beaten by someone,
                records of that will show up here`}
            />
          )
        )}
      </Spacer>
    </>
  );
};
