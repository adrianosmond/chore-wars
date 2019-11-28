import React from 'react';
import { useHistory } from 'react-router-dom';
import useChoreDetails from 'hooks/useChoreDetails';
import routes from 'constants/routes';
import CompletionHistoryContainer from 'containers/CompletionHistoryContainer';
import EditHistoryContainer from 'containers/EditHistoryContainer';
import CompletionStatsContainer from 'containers/CompletionStatsContainer';
import Card from 'components/Card';
import Typography from 'components/Typography';
import Spacer from 'components/Spacer';
import { ClothIcon, BroomIcon } from 'components/Icon';
import Loading from 'components/Loading';
import InfoPanel from 'components/InfoPanel';
import Button from 'components/Button';

export default ({ id }) => {
  const {
    chore,
    completions,
    completionRatio,
    timeDifferences,
    edits,
    loading,
  } = useChoreDetails(id);

  const history = useHistory();

  if (loading) {
    return <Loading showText={false} />;
  }

  if (!chore) {
    return (
      <InfoPanel
        Icon={BroomIcon}
        title="Which chore?"
        description="Hmm. Not sure what's happened here. If there was ever a chore here, it's gone now. Maybe you cleaned up it?"
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
        {chore.name}
      </Typography>
      <Spacer>
        {timeDifferences.length > 0 && (
          <CompletionStatsContainer
            completionRatio={completionRatio}
            timeDifferences={timeDifferences}
            frequency={chore.frequency}
          />
        )}
        {completions.length > 0 ? (
          <Card title="Recent completions">
            <CompletionHistoryContainer
              history={completions}
              highlightPlayerName={true}
            />
          </Card>
        ) : (
          <InfoPanel
            Icon={ClothIcon}
            title="No completions yet"
            description="It looks like this chore has never been completed. When you have done it, you'll be able to see stats about it here."
          />
        )}
        {edits.length > 0 && (
          <Card title="Edits">
            <EditHistoryContainer history={edits} />
          </Card>
        )}
      </Spacer>
    </>
  );
};
