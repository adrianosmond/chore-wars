import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import withAuthorization from '../withAuthorization';

import { setGame } from '../../actions/sessionActions';

import { database } from '../../lib/firebase';

import * as routes from '../../constants/routes';
import { MAX_NAME_LENGTH, JOIN_CODE_LENGTH } from '../../constants/constants';

const createJoinCode = () => new Array(JOIN_CODE_LENGTH).fill(97).map(x =>
  String.fromCharCode(x + Math.round(Math.random() * 25))).join('');

const generatePlayerData = (playerName, joinCode = null) => ({
  name: playerName,
  isOwed: 0,
  points: 0,
  joinCode,
  avatar: {
    accessoriesType: 'Blank',
    avatarStyle: 'Transparent',
    clotheColor: 'Blue03',
    clotheType: 'BlazerShirt',
    eyeType: 'Default',
    eyebrowType: 'Default',
    facialHairColor: 'BrownDark',
    facialHairType: 'Blank',
    hairColor: 'BrownDark',
    mouthType: 'Twinkle',
    skinColor: 'Light',
    topType: 'LongHairStraight',
  },
});

class NoGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      gameToJoin: '',
    };
  }

  createGame() {
    const userId = this.props.user;
    const { playerName } = this.state;
    const joinCode = createJoinCode();
    const gameData = {
      gameIncomplete: true,
      points: {
        [userId]: generatePlayerData(playerName, joinCode),
      },
    };

    database.ref('games').push().then((ref) => {
      const gameKey = ref.key;
      const userData = {
        gameId: gameKey,
      };
      database.ref(`joinCodes/${joinCode}`).set(gameKey);
      database.ref(`users/${userId}`).set(userData).then(() => {
        this.props.setGame(userData);
        ref.set(gameData);
        this.props.history.push(routes.CHORES);
      });
    });
  }

  joinGame() {
    const userId = this.props.user;
    const { gameToJoin, playerName } = this.state;
    database.ref(`joinCodes/${gameToJoin}`).once('value', (result) => {
      const gameKey = result.val();
      const userData = {
        gameId: gameKey,
      };
      database.ref(`users/${userId}`).set(userData).then(() => {
        database.ref(`games/${gameKey}/points/`).once('value', (users) => {
          users.forEach(user => user.child('joinCode').ref.set(null));
        });
        database.ref(`games/${gameKey}/points/${userId}`)
          .set(generatePlayerData(playerName))
          .then(() => {
            database.ref(`games/${gameKey}/gameIncomplete`).set(null);
            database.ref(`joinCodes/${gameToJoin}`).set(null);
            this.props.setGame(userData);
            this.props.history.push(routes.CHORES);
          });
      });
    });
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
        <button onClick={this.joinGame.bind(this)}
          disabled={this.state.playerName.trim().length === 0 || this.state.gameToJoin.length !== 8}
          className="form__button">Join game</button>

        <h2>Create a game</h2>
        <p>Alternatively, if you want create a new game and invite someone else...</p>
        <button onClick={this.createGame.bind(this)}
          disabled={this.state.playerName.trim().length === 0}
          className="form__button form__button--secondary">Create a game</button>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = () => false;

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
});

const mapDispatchToProps = dispatch => ({
  setGame: game => dispatch(setGame(game)),
});


export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(NoGame);
