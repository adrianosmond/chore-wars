import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'avataaars';
import Confetti from 'react-dom-confetti';

import PopUpMenu from '../PopUpMenu';

import { claimPrize, paidDebt } from '../../actions/pointActions';

import { MAX_POINT_DIFFERENCE } from '../../constants/constants';
import * as routes from '../../constants/routes';

import './PointsGraph.css';

const PointsGraph = (props) => {
  const { points } = props;
  const players = Object.keys(props.points);

  const minPoints = players.length === 2 ?
    Math.min(points[players[0]].points, points[players[1]].points) :
    points[players[0]].points;

  const scoresTied = players.length === 2 ?
    points[players[0]].points === points[players[1]].points :
    true;

  return (
    <div className="points-graph">
      <h1 className="points-graph__title">Chore Wars</h1>
      <div className="points-graph__people">
        {players.map((playerId, idx) => {
          const player = points[playerId];
          const playerPicture = (
            <div className="points-graph__person-picture">
              <Avatar style={{ width: '100%', height: '100%', display: 'block' }} { ...player.avatar } />
              { player.isOwed > 0 ?
              <PopUpMenu extraClasses={`points-graph__paid-button points-graph__paid-button--${idx + 1}`}
                side={ idx === 0 ? 'left' : 'right' }
                options={[{
                  type: 'button',
                  text: `${player.name} was paid back`,
                  onClick: () => props.paidDebt(playerId, props.gameId),
                }]}>
                <span className="points-graph__person-owed" role="img" aria-labelledby={`${player.name} is owed`}>🌟</span>
                { player.isOwed > 1 ? <span className="points-graph__owed-multiple">{player.isOwed}</span> : null }
              </PopUpMenu>
              : null}
            </div>
          );
          const playerName = <div className="points-graph__person-name">{player.name}</div>;
          if (playerId === props.user) {
            return (
              <Link to={routes.EDIT_PROFILE} className={`points-graph__person points-graph__person--${idx + 1}`} key={playerId}>
                {playerPicture}
                {playerName}
              </Link>
            );
          }
          return (
            <div className={`points-graph__person points-graph__person--${idx + 1}`} key={playerId}>
              {playerPicture}
              {playerName}
            </div>
          );
        })}
        {players.length === 2 ? null :
        <div className="points-graph__person">
          <p>Invite someone to sign up and give them the code:</p>
          <p>{points[players[0]].joinCode}</p>
          <p>to get them to join this game.</p>
        </div>}
      </div>
      <div className="points-graph__graph">
        {players.map((playerId, idx) => {
          const player = points[playerId];
          const playerBar = (player.points - minPoints);
          const winning = playerBar >= MAX_POINT_DIFFERENCE;
          return (
            <div className={`points-graph__bar points-graph__bar--${idx + 1}${winning ? ' points-graph__bar--winning' : ''}`}
              style={{ width: `${Math.min(50, (playerBar / MAX_POINT_DIFFERENCE) * 50)}%` }}
              key={playerId}>
              { playerBar || scoresTied ?
              <div className={`points-graph__difference points-graph__difference--${idx + 1}${winning ? ' points-graph__difference--winning' : ''}`}
                onClick={winning ? () => props.claimPrize(playerId, props.gameId) : null}>
                <Confetti active={!winning} />
                {playerBar}
                </div>
              : null }
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  points: state.points.present,
  user: state.session.authUser.uid,
  gameId: state.session.game.gameId,
});

const matchDispatchToProps = dispatch => ({
  claimPrize: (player, game) => dispatch(claimPrize(player, game)),
  paidDebt: (player, game) => dispatch(paidDebt(player, game)),
});

export default connect(mapStateToProps, matchDispatchToProps)(PointsGraph);
