import React from 'react';
import { useHoliday } from 'contexts/game';
import ChoresContainer from 'containers/ChoresContainer';
import AddPlayersContainer from 'containers/AddPlayersContainer';
import ScoresContainer from 'containers/ScoresContainer';
import ActionsContainer from 'containers/ActionsContainer';
import OnHolidayContainer from 'containers/OnHolidayContainer';
import Layout from 'components/Layout';
import Spacer from 'components/Spacer';

const ChoresPage = () => {
  const holiday = useHoliday();
  if (holiday) {
    return <Layout primary={<OnHolidayContainer />} />;
  }
  return (
    <Layout
      header={
        <>
          <ScoresContainer />
        </>
      }
      primary={
        <>
          <Spacer>
            <AddPlayersContainer />
            <ChoresContainer />
          </Spacer>
        </>
      }
      secondary={
        <>
          <ActionsContainer />
        </>
      }
    />
  );
};

export default ChoresPage;
