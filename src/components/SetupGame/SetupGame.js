import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createGame, joinGame } from '../../actions/sessionActions';

import { MAX_NAME_LENGTH, JOIN_CODE_LENGTH } from '../../constants/constants';

class NoGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      gameToJoin: '',
    };
  }

  render() {
    return (
      <div className="form">
        <h1>Welcome to Chore Wars!</h1>
        <p>Firstly, please tell us your first name, or whatever you want
          to be called in the game.</p>
        <input type="text" placeholder="e.g. Sarah" className="form__input" value={this.state.playerName}
          onChange={(event) => { this.setState({ playerName: event.target.value }); }}
          maxLength={MAX_NAME_LENGTH} />

        <h2>Join a game</h2>
        <p>If you have been given a code to join someone else's game, you can enter
          it here:</p>
        <input type="text" placeholder="e.g. abcdwxyz" className="form__input" value={this.state.gameToJoin}
          onChange={(event) => { this.setState({ gameToJoin: event.target.value }); }}
          maxLength={JOIN_CODE_LENGTH} />
        <button onClick={() => this.props.joinGame(this.props.user, this.state.playerName)}
          disabled={this.state.playerName.trim().length === 0 || this.state.gameToJoin.length !== 8}
          className="form__button">Join game</button>

        <h2>Create a game</h2>
        <p>Alternatively, if you want create a new game and invite someone else...</p>
        <button onClick={() => this.props.createGame(this.props.user, this.state.gameToJoin, this.state.playerName)}
          disabled={this.state.playerName.trim().length === 0 ||
            this.state.gameToJoin.trim().length > 0}
          className="form__button form__button--secondary">Create a game</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
});

const mapDispatchToProps = dispatch => ({
  createGame: (userId, playerName) => dispatch(createGame(userId, playerName)),
  joinGame: (userId, gameToJoin, playerName) => dispatch(joinGame(userId, gameToJoin, playerName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoGame);
