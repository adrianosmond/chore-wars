import React from 'react';
import Confetti from 'react-dom-confetti';
import PropTypes from 'prop-types';

import { claimPrize } from 'utils/database';

import { MAX_POINT_DIFFERENCE } from 'constants/constants';

import './Scores.css';

const Scores = ({ points, gameId }) => {
  const players = Object.keys(points);

  const minPoints = players.length === 2
    ? Math.min(points[players[0]].points, points[players[1]].points)
    : points[players[0]].points;

  const scoresTied = players.length === 2
    ? points[players[0]].points === points[players[1]].points
    : true;

  /* eslint-disable jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions */
  return (
    <div className="scores">
      {players.map((playerId, idx) => {
        const player = points[playerId];
        const playerBar = (player.points - minPoints);
        const winning = playerBar >= MAX_POINT_DIFFERENCE;
        return (
          <div
            className={`scores__bar scores__bar--${idx + 1}${winning ? ' scores__bar--winning' : ''}`}
            style={{ width: `${Math.min(50, (playerBar / MAX_POINT_DIFFERENCE) * 50)}%` }}
            key={playerId}
          >
            { playerBar || (scoresTied && idx) ? (
              <div
                className={`scores__difference scores__difference--${idx + 1}${winning ? ' scores__difference--winning' : ''}`}
                onClick={winning ? () => claimPrize(playerId, gameId) : null}
              >
                <Confetti active={!winning} />
                {playerBar}
              </div>
            ) : null }
          </div>
        );
      })}
    </div>
  );
  /* eslint-enable */
};

Scores.propTypes = {
  points: PropTypes.objectOf(PropTypes.any).isRequired,
  gameId: PropTypes.string.isRequired,
};

export default Scores;
