import React from 'react';
import Flexer from 'components/Flexer';
import DonutChart from 'components/DonutChart';
import Spacer from 'components/Spacer';
import Typography from 'components/Typography';
import StatTile from 'components/StatTile';

const msToDays = (time) => (time / 60000 / 60 / 24).toFixed(1);

const CompletionStatsContainer = ({ completionRatio, timeDifferences }) => {
  const avgCompletionTime =
    timeDifferences.length > 0
      ? msToDays(
          timeDifferences.reduce((a, b) => a + b, 0) / timeDifferences.length,
        )
      : 'N/A';
  return (
    <Flexer breakpoint="28rem">
      <Spacer spacing="xs">
        <Typography appearance="h4">Completed by</Typography>
        <DonutChart
          data={completionRatio.map(({ name, completions }) => ({
            label: name,
            value: completions,
          }))}
        />
      </Spacer>
      <div>
        <StatTile
          title="Completed every"
          stat={avgCompletionTime}
          statDetail="days"
          footer="on average"
        />
      </div>
    </Flexer>
  );
};

export default CompletionStatsContainer;
