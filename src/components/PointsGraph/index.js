import React from 'react'
import { connect } from 'react-redux'
import './index.css'

const PointsGraph = (props) => {
  const { points } = props
  const { maxPoints } = points
  const players = Object.keys(props.points).filter((id) => id !== 'max');
  const minPoints = Math.min(points[players[0]].points, points[players[1]].points)
  return (
    <div className="points-graph">
      <div className="points-graph__people">
        {players.map((playerId, idx) => {
          const player = points[playerId]
          return (
            <div className={`points-graph__person points-graph__person--${idx + 1}`} key={playerId}>
              <img src={`/images/avatars/${playerId}.svg`} className="points-graph__person-picture" alt={"adrian"} />
              <div className="points-graph__person-name">{player.name}</div>
            </div>
          )
        })}
      </div>
      <div className="points-graph__graph">
        {players.map((playerId, idx) => {
          const player = points[playerId]
          const playerBar = (player.points - minPoints)
          return (
            <div className={`points-graph__bar points-graph__bar--${idx+1}`} style={{width: `${(playerBar / maxPoints) * 50}%`}} key={playerId}>
              { playerBar ? <div className={`points-graph__difference points-graph__difference--${idx+1}`}>{playerBar}</div> : null }
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  points: state.points.points
})

export default connect(mapStateToProps)(PointsGraph)
