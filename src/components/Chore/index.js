import React from 'react';
import { connect } from 'react-redux';
import fecha from 'fecha';

import ChoreMenu from '../ChoreMenu';

import { completeChore } from '../../actions/choreActions';
import { DATE_FORMAT } from '../../constants/constants';

import './index.css';

import checkIcon from '../../images/check.svg';

const Chore = ({
  chore, user, game, markChoreComplete,
}) => {
  const bonusPoints = chore.currentPoints > chore.pointsPerTime;
  return (
    <div className="chore">
      <span className="chore__title">{chore.title}</span>
      <div className="chore__bar">
        <div className={`chore__bar-inner${bonusPoints ? ' chore__bar-inner--bonus' : ''}`} style={{
          textAlign: 'center',
          width: `${chore.percentage}%`,
        }}>
        <span className={`chore__points${bonusPoints ? ' chore__points--bonus' : ''}`}>{chore.currentPoints}</span>
      </div>
    </div>
    <div className="chore__last-done">
      Done: {fecha.format(new Date(chore.lastDone), DATE_FORMAT)}<br/>
      Due: {fecha.format(new Date(chore.due), DATE_FORMAT)}
    </div>
    <button className="chore__complete-button" onClick={markChoreComplete.bind(null, chore, user, game, chore.slug)}>
      <img src={checkIcon} alt="Mark as complete" />
    </button>
    <div className="chore__extra-options">
      <ChoreMenu slug={chore.slug} />
    </div>
  </div>
  );
};

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
  game: state.session.game.gameId,
});

const mapDispatchToProps = dispatch => ({
  markChoreComplete: (chore, user, game, slug) => dispatch(completeChore(chore, user, game, slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chore);
