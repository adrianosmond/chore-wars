import React from 'react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';

import Chore from 'components/Chore';

import './ChoresList.css';

const ChoresList = ({
  chores, user, game, allChores,
}) => (
  <ul className="chores-list">
    { chores.length === 0 ? (
      <div>
        <p className="hide--large">
            You can add chores or customise your character from the menu below
            - tap the arrow to open it.
        </p>
      </div>
    ) : null }
    <FlipMove>
      {chores.map(chore => (
        <li className="chores-list__item" key={chore.title}>
          <Chore chore={chore} allChores={allChores} user={user} game={game} />
        </li>
      ))}
    </FlipMove>
  </ul>
);

ChoresList.propTypes = {
  chores: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  allChores: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChoresList;
