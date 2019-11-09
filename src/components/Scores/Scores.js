import React from 'react';
import TwoPlayerScorecard from 'components/TwoPlayerScorecard';
import PlayerRow from 'components/PlayerRow';
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
        <table>
          <tbody>
            {players.map(({ name, points, id }) => (
              <PlayerRow
                key={id}
                id={id}
                name={name}
                points={points}
                minPoints={minPoints}
                maxPoints={maxPoints}
              />
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default Scores;
