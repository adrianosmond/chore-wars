import React from 'react';
import { useHoliday } from 'contexts/holiday';
import ChoresContainer from 'containers/ChoresContainer';
import AddPlayersContainer from 'containers/AddPlayersContainer';
import ScoresContainer from 'containers/ScoresContainer';
import ActionsContainer from 'containers/ActionsContainer';
import OnHolidayContainer from 'containers/OnHolidayContainer';
import Layout from 'components/Layout';

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
          <AddPlayersContainer />
          <ChoresContainer />
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
