import React from 'react';
import FlipMove from 'react-flip-move';

import Chore from '../Chore';

import './index.css';

const ChoresList = ({ chores }) => (
  <ul className="chores-list">
    { chores.length === 0 ?
    <div>
      <p>You can customise your character by tapping on your avatar</p>
      <p className="hide--large">You can add chores from the menu below - tap the arrow to open it.</p>
    </div>
    : null }
    <FlipMove>
    {chores.map(chore =>
      <li className="chores-list__item" key={chore.title}>
        <Chore chore={chore} />
      </li>)}
    </FlipMove>
  </ul>
);

export default ChoresList;
