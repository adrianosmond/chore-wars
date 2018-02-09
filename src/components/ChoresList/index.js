import React from 'react'

import Chore from '../Chore'

import './index.css'

const ChoresList = ({chores, completeChore}) =>
  <ul className="chores-list">
    {chores.map((chore, idx) =>
      <li className="chores-list__item" key={idx}>
        <Chore chore={chore} completeChore={() => { completeChore(chore) }} />
      </li>
    )}
  </ul>

export default ChoresList
