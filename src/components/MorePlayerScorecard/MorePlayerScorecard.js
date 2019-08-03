import React from 'react';
import Player from 'components/Player';

const MorePlayerScorecard = ({ players, minPoints, maxPoints }) => (
  <div>
    {players.map(({ name, points, id }) => (
      <Player
        key={id}
        name={name}
        points={points}
        minPoints={minPoints}
        maxPoints={maxPoints}
      />
    ))}
  </div>
);
export default MorePlayerScorecard;
