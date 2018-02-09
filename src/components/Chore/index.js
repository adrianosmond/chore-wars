import React from 'react'
import fecha from 'fecha'

import './index.css'

import checkIcon from '../../images/check.svg'

const DATE_FORMAT = 'DD/MM/YYYY'

const Chore = ({chore, completeChore}) => {
  const bonusPoints = chore.currentPoints > chore.pointsPerTime
  return (
    <div className="chore">
      <span className="chore__title">{chore.title}</span>
      <div className="chore__bar">
        <div className={`chore__bar-inner${ bonusPoints ? ' chore__bar-inner--bonus' : ''}`} style={{
          textAlign: 'center',
          width: `${chore.percentage}%`
        }}>
        <span className={`chore__points${ bonusPoints ? ' chore__points--bonus' : ''}`}>{chore.currentPoints}</span>
      </div>
    </div>
    <div className="chore__last-done">
      Done: {fecha.format(new Date(chore.lastDone), DATE_FORMAT )}<br/>
      Due: {fecha.format(new Date(chore.due), DATE_FORMAT )}
    </div>
    <button className="chore__complete-button" onClick={completeChore}>
      <img src={checkIcon} alt="Mark as complete" />
    </button>
  </div>
  )
}

export default Chore
