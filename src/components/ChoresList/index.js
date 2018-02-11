import React from 'react'

import Chore from '../Chore'

import './index.css'

const ChoresList = ({chores}) =>
  <ul className="chores-list">
    {chores.map((chore, idx) =>
      <li className="chores-list__item" key={chore.title}>
        <Chore chore={chore} />
      </li>
    )}
  </ul>

export default ChoresList
