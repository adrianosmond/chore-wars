import React from 'react';
import usePlayerDetails from 'hooks/usePlayerDetails';
import CompletionHistoryContainer from 'containers/CompletionHistoryContainer';
import Loading from 'components/Loading';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Typography from 'components/Typography';
import InfoPanel from 'components/InfoPanel';
import { BroomIcon } from 'components/Icon';

export default ({ id }) => {
  const { player, completions, loading } = usePlayerDetails(id);

  if (loading) {
    return <Loading />;
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
            description={`Eventually completion stats will show up here, but it looks like ${player.name} hasn't completed any chores yet.`}
          />
        )}
      </Spacer>
    </>
  );
};
