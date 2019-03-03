import React from 'react';
import FlipMove from 'react-flip-move';

import Chore from 'components/Chore';

import './ChoresList.css';

const ChoresList = ({ chores, user, game }) => {
  const now = new Date().getTime();
  return (
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
        {chores.filter(chore => now - chore.lastDone >= 60000).map(chore => (
          <li className="chores-list__item" key={chore.title}>
            <Chore chore={chore} chores={chores} user={user} game={game} />
          </li>
        ))}
      </FlipMove>
    </ul>
  );
};

export default ChoresList;
