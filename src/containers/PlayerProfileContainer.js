import React from 'react';
import { useHistory } from 'react-router-dom';
import usePlayerDetails from 'hooks/usePlayerDetails';
import routes from 'constants/routes';
import CompletionHistoryContainer from 'containers/CompletionHistoryContainer';
import WinsAndLossesContainer from 'containers/WinsAndLossesContainer';
import Loading from 'components/Loading';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Typography from 'components/Typography';
import InfoPanel from 'components/InfoPanel';
import { BroomIcon, SprayIcon, ClothIcon } from 'components/Icon';
import Button from 'components/Button';

export default ({ id }) => {
  const {
    player,
    completions,
    winsAndLosses,
    loading,
    setDebtPaidBack,
  } = usePlayerDetails(id);

  const history = useHistory();

  if (loading) {
    return <Loading showText={false} />;
  }

  if (!player) {
    return (
      <InfoPanel
        Icon={ClothIcon}
        title="Who?"
        description="Hmm. Not sure what's happened here. If there was ever a player here, they're gone now."
        cta={
          <Button onClick={() => history.push(routes.HOME)}>
            Go back to the chores
          </Button>
        }
      />
    );
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
              setDebtPaidBack={setDebtPaidBack}
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
