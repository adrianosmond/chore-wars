import React from 'react';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import TwoPlayerScorecard from 'components/TwoPlayerScorecard';
import PlayerRow from 'components/PlayerRow';
import Card from 'components/Card';

const Scores = ({ players, minPoints, maxPoints }) => {
  const range = Math.min(maxPoints - minPoints, MAX_POINT_DIFFERENCE);
  const mid =
    range === MAX_POINT_DIFFERENCE
      ? maxPoints - MAX_POINT_DIFFERENCE / 2
      : range / 2 + minPoints;

  return (
    <Card>
      {players.length === 2 ? (
        <TwoPlayerScorecard players={players} minPoints={minPoints} />
      ) : (
        <table>
          <tbody>
            {players.map(({ name, points, id, avatar }) => (
              <PlayerRow
                key={id}
                id={id}
                name={name}
                avatar={avatar}
                points={points}
                minPoints={minPoints}
                mid={mid}
              />
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default Scores;
