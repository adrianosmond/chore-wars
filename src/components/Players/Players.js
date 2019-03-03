import React from 'react';
import Avatar from 'avataaars';
import PropTypes from 'prop-types';

import OwedBadge from 'components/OwedBadge';

import './Players.css';

const Players = ({ players, points, gameId }) => (
  <div className="players">
    {players.map((player, idx) => (
      <div className={`players__player players__player--${idx + 1}`} key={player.id}>
        <div className="players__avatar">
          <Avatar style={{ width: '100%', height: '100%', display: 'block' }} {...player.avatar} />
          <OwedBadge player={player} idx={idx} points={points} gameId={gameId} />
        </div>
        <div className="players__player-name">{player.name}</div>
      </div>
    ))}
    { players.length < 2 ? (
      <div className="players__player">
        <p>Invite someone to sign up and give them the code:</p>
        <p id="join-code">{players[0].joinCode}</p>
        <p>to get them to join this game.</p>
      </div>
    ) : null }
  </div>
);

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  points: PropTypes.objectOf(PropTypes.any).isRequired,
  gameId: PropTypes.string.isRequired,
};

export default Players;
