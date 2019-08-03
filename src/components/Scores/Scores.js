import React from 'react';
import TwoPlayerScorecard from 'components/TwoPlayerScorecard';
import MorePlayerScorecard from 'components/MorePlayerScorecard';
import Card from 'components/Card';

const Scores = ({ players, minPoints, maxPoints }) => {
  return (
    <Card>
      {players.length === 2 ? (
        <TwoPlayerScorecard
          players={players}
          maxPoints={maxPoints}
          minPoints={minPoints}
        />
      ) : (
        <MorePlayerScorecard
          players={players}
          maxPoints={maxPoints}
          minPoints={minPoints}
        />
      )}
    </Card>
  );
};

export default Scores;
