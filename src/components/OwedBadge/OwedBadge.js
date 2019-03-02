import React from 'react';
import { connect } from 'react-redux';

import PopUpMenu from 'components/PopUpMenu';

import { paidDebt } from 'utils/database';

const OwedBadge = ({
  player, idx, gameId, points,
}) => {
  const playerPoints = points[player.id];
  if (playerPoints.isOwed === 0) return null;
  return (
    <PopUpMenu extraClasses={`players__paid-button players__paid-button--${idx + 1}`}
      side={ idx === 0 ? 'left' : 'right' }
      options={[{
        type: 'button',
        text: `${player.name} was paid back`,
        onClick: () => paidDebt(player.id, gameId),
      }]}>
      <span className="players__player-owed" role="img" aria-labelledby={`${player.name} is owed`}>🌟</span>
      { playerPoints.isOwed > 1 ? <span className="players__owed-multiple">{playerPoints.isOwed}</span> : null }
    </PopUpMenu>
  );
};

const mapStateToProps = state => ({
  points: state.points.present,
  gameId: state.session.game.gameId,
});

export default connect(mapStateToProps)(OwedBadge);
