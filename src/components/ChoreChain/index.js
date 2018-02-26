import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import FlipMove from 'react-flip-move';

import withAuthorization from '../withAuthorization';

import { loadChores, makeChain } from '../../actions/choreActions';

import { convertChoresToArray } from '../../constants/utils';
import * as routes from '../../constants/routes';

class ChoreChain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: props.chores,
      chain: [],
    };
  }

  componentWillMount() {
    if (!this.props.chores) {
      this.props.loadChores(this.props.game);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.chores !== newProps.chores) {
      this.setState({
        chores: newProps.chores,
      });
    }
  }

  chooseChore(chosenChore, event) {
    const checkbox = event.target;
    let chain = this.state.chain.slice();
    if (checkbox.checked) {
      chain.push(chosenChore);
    } else {
      chain = chain.filter(chore => chore.slug !== checkbox.name);
    }
    this.setState({
      chain,
    });
  }

  moveChoreUp(idx) {
    const chain = this.state.chain.slice();
    if (chain.length === 1 || idx === 0) return;
    [chain[idx], chain[idx - 1]] = [chain[idx - 1], chain[idx]];
    this.setState({
      chain,
    });
  }

  moveChoreDown(idx) {
    const chain = this.state.chain.slice();
    if (chain.length === 1 || idx === chain.length - 1) return;
    [chain[idx], chain[idx + 1]] = [chain[idx + 1], chain[idx]];
    this.setState({
      chain,
    });
  }

  saveChain() {
    const { chain } = this.state;
    this.props.makeChain(this.props.game, chain.map(chore => chore.slug));
    this.props.history.push(routes.CHORES);
  }

  render() {
    const { chores, chain } = this.state;
    if (!chores) return null;
    const choresArr = convertChoresToArray(chores).filter(chore => !chore.enables);
    const canSave = chain.length > 1;
    return (
      <div>
        <h1>Chain</h1>
        <p>Select all the chores that are part of this chain</p>
        <ul>
          {choresArr.map(chore =>
          <li key={chore.slug}>
            <label><input type="checkbox" name={chore.slug} onChange={this.chooseChore.bind(this, chore)} />{chore.title}</label>
          </li>)}
        </ul>
        <p>Choose the order that the chores should be done in</p>
        <ul>
          <FlipMove>
          {chain.map((chore, idx) =>
          <li key={chore.slug}>
            {chore.title}
            <button onClick={this.moveChoreUp.bind(this, idx)} disabled={idx === 0}>^</button>
            <button onClick={this.moveChoreDown.bind(this, idx)} disabled={idx === chain.length - 1}>v</button>
          </li>)}
          </FlipMove>
        </ul>
        { canSave ?
        <button onClick={this.saveChain.bind(this)}>Save</button>
        : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.session.game.gameId,
  chores: state.chores.present,
});

const mapDispatchToProps = dispatch => ({
  loadChores: game => dispatch(loadChores(game)),
  makeChain: (game, chain) => dispatch(makeChain(game, chain)),
});

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

export { ChoreChain };

export default compose(
  withAuthorization(authCondition, isLoading),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ChoreChain);
