import React from 'react';
import FlipMove from 'react-flip-move';

import Chore from '../Chore';

import './index.css';

const ChoresList = ({ chores }) => (
  <ul className="chores-list">
    <FlipMove>
    {chores.map(chore =>
      <li className="chores-list__item" key={chore.title}>
          <Chore chore={chore} />
      </li>)}
    </FlipMove>
  </ul>
);

export default ChoresList;
