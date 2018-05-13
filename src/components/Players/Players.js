import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'avataaars';

import PopUpMenu from 'components/PopUpMenu';

import { paidDebt } from 'actions/pointActions';

import './Players.css';

const Players = ({
  players, gameId, debtPaid,
}) =>
  <div className="players">
    {players.map((player, idx) => (
      <div className={`players__player players__player--${idx + 1}`} key={player.id}>
        <div className="players__avatar">
          <Avatar style={{ width: '100%', height: '100%', display: 'block' }} { ...player.avatar } />
          { player.isOwed > 0 ?
            <PopUpMenu extraClasses={`players__paid-button players__paid-button--${idx + 1}`}
              side={ idx === 0 ? 'left' : 'right' }
              options={[{
                type: 'button',
                text: `${player.name} was paid back`,
                onClick: () => debtPaid(player.id, gameId),
              }]}>
              <span className="players__player-owed" role="img" aria-labelledby={`${player.name} is owed`}>🌟</span>
              { player.isOwed > 1 ? <span className="players__owed-multiple">{player.isOwed}</span> : null }
            </PopUpMenu> : null}
        </div>
        <div className="players__player-name">{player.name}</div>
      </div>
    ))}
    { players.length < 2 ?
        <div className="players__player">
          <p>Invite someone to sign up and give them the code:</p>
          <p id="join-code">{players[0].joinCode}</p>
          <p>to get them to join this game.</p>
        </div>
        : null }
  </div>;

const mapStateToProps = state => ({
  gameId: state.session.game.gameId,
});

const matchDispatchToProps = dispatch => ({
  debtPaid: (player, game) => dispatch(paidDebt(player, game)),
});

export default connect(mapStateToProps, matchDispatchToProps)(Players);
