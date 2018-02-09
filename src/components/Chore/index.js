import React from 'react'

import './index.css'

import checkIcon from '../../images/check.svg'

const Chore = ({chore, completeChore}) =>
  <div className="chore">
    <span className="chore__title">{chore.title}</span>
    <div className="chore__bar">
      <div className="chore__bar-inner" style={{
        textAlign: 'center',
        width: `${chore.percentage}%`
      }}>
        <span className="chore__points">{chore.currentPoints}</span>
      </div>
    </div>
    <button className="chore__complete-button" onClick={completeChore}>
      <img src={checkIcon} alt="Mark as complete" />
    </button>
  </div>

export default Chore
