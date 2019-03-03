import React from 'react';
import fecha from 'fecha';
import PropTypes from 'prop-types';

import PopUpMenu from 'components/PopUpMenu';

import { completeChore, removeChore, breakChain } from 'utils/database';
import { DATE_FORMAT } from 'constants/constants';
import * as routes from 'constants/routes';

import checkIcon from 'images/check.svg';
import './Chore.css';

const Chore = ({
  chore, user, game, allChores,
}) => {
  const bonusPoints = chore.currentPoints > chore.pointsPerTime;
  const menuOptions = [
    { type: 'link', to: `${routes.EDIT_CHORE}/${chore.slug}`, text: 'Edit' },
    { type: 'button', onClick: () => removeChore(game, chore.slug, allChores), text: 'Delete' },
    { type: 'link', to: `${routes.LOG_PAST_COMPLETION}/${chore.slug}`, text: 'I forgot to log this' },
  ];
  if (chore.enables) {
    menuOptions.push({
      type: 'button',
      onClick: () => breakChain(game, chore.slug, allChores),
      text: 'Break Chain',
    });
  }
  return (
    <div className="chore">
      <span className="chore__title">{chore.title}</span>
      <div className="chore__bar">
        <div
          className={`chore__bar-inner${bonusPoints ? ' chore__bar-inner--bonus' : ''}`}
          style={{
            width: `${chore.percentage}%`,
          }}
        >
          <span className={`chore__points${bonusPoints ? ' chore__points--bonus' : ''}`}>
            {chore.currentPoints}
          </span>
        </div>
      </div>
      <div className="chore__last-done">
        {'Done: '}
        {fecha.format(new Date(chore.lastDone), DATE_FORMAT)}
        <br />
        { chore.frequency > 0
          ? (
            <span>
              {'Due: '}
              <span className={`${bonusPoints ? 'chore__last-done--overdue' : ''}`}>
                {fecha.format(new Date(chore.due), DATE_FORMAT)}
              </span>
            </span>
          )
          : null }
      </div>
      <button
        type="button"
        className="chore__complete-button"
        onClick={() => completeChore(chore, user, game)}
      >
        <img src={checkIcon} alt="Mark as complete" />
      </button>
      <PopUpMenu
        extraClasses="chore__extra-options"
        options={menuOptions}
      >
        <div className="chore__extra-icon">
          <span className="chore__extra-icon-text">…</span>
        </div>
      </PopUpMenu>
    </div>
  );
};

Chore.propTypes = {
  chore: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  allChores: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Chore;
