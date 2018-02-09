import React from 'react'

import './index.css'

import adrianLogo from '../../images/adrian.svg'
import dinaLogo from '../../images/dina.svg'

const PointsGraph = (props) => {
  const {adrianPoints, dinaPoints, maxPoints} = props.points
  const minPoints = Math.min(adrianPoints, dinaPoints)
  const adrianBar = adrianPoints - minPoints
  const dinaBar = dinaPoints - minPoints
  return (
    <div className="points-graph">
      <div className="points-graph__people">
        <div className="points-graph__person points-graph__person--adrian">
          <img src={adrianLogo} className="points-graph__person-picture points-graph__person-picture--adrian" alt="adrian" />
          <div className="points-graph__person-name">Adrian</div>
        </div>
        <div className="points-graph__person points-graph__person--dina">
          <img src={dinaLogo} className="points-graph__person-picture points-graph__person-picture--dina" alt="dina" />
          <div className="points-graph__person-name">Dina</div>
        </div>
      </div>
      <div className="points-graph__graph">
        <div className="points-graph__bar points-graph__bar--adrian" style={{
          width: `${(adrianBar / maxPoints) * 100}%`
        }}>
          { adrianBar ? <div className="points-graph__difference points-graph__difference--adrian">{adrianBar}</div> : null }
        </div>
        <div className="points-graph__bar points-graph__bar--dina" style={{
          width: `${(dinaBar / maxPoints) * 100}%`
        }}>
          { dinaBar ? <div className="points-graph__difference points-graph__difference--dina">{dinaBar}</div> : null }
        </div>
      </div>
    </div>
  )
}

export default PointsGraph
