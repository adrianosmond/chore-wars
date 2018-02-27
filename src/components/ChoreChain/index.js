import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import FlipMove from 'react-flip-move';

import withAuthorization from '../withAuthorization';

import { loadChores, makeChain } from '../../actions/choreActions';

import { convertChoresToArray } from '../../constants/utils';
import * as routes from '../../constants/routes';

import './index.css';

import checkIcon from '../../images/check.svg';

const filterAndSortChores = (chores) => {
  if (!chores) return null;
  return convertChoresToArray(chores)
    .sort((a, b) => {
      if (a.slug < b.slug) return -1;
      if (b.slug < a.slug) return 1;
      return 0;
    })
    .filter(chore => !chore.enables);
};

class ChoreChain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: filterAndSortChores(props.chores),
      chain: [],
      stage: 'selection',
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
        chores: filterAndSortChores(newProps.chores),
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
    const { chores, chain, stage } = this.state;
    if (!chores) return null;
    const canSave = chain.length > 1;
    return (
      <div className="chore-chain">
        <h1 className="chore-chain__title">Create a Chain</h1>
        { stage === 'selection' ?
        <div className="chore-chain__section">
          <p>Select all the chores that are part of this chain</p>
          <ul className="chore-chain__options">
            {chores.map(chore =>
            <li key={chore.slug}>
              <label className="chore-chain__option">
                <input className="chore-chain__checkbox" type="checkbox" name={chore.slug}
                  onChange={this.chooseChore.bind(this, chore)}
                  checked={chain.findIndex(item => item.slug === chore.slug) >= 0} />
                <span className="chore-chain__chore-title">{chore.title}</span>
                <div className="chore-chain__status">
                  <img className="chore-chain__status-icon" src={checkIcon} alt="Include chore in chain" />
                </div>
              </label>
            </li>)}
          </ul>
          <div className="form__button-holder">
            <Link to={routes.CHORES} className="form__button form__button--secondary">Cancel</Link>
            <button disabled={!canSave} className="form__button"
              onClick={() => this.setState({ stage: 'sorting' })}>Next</button>
          </div>
        </div>
        : null }
        { stage === 'sorting' ?
        <div className="chore-chain__section">
          <p>Choose the order that the chores should be done in</p>
          <ul className="chore-chain__options">
            <FlipMove>
            {chain.map((chore, idx) =>
            <li key={chore.slug} className="chore-chain__option">
              <span className="chore-chain__chore-title">{chore.title}</span>
              <div className="chore-chain__sort-buttons">
                <button className="chore-chain__sort-button" onClick={this.moveChoreUp.bind(this, idx)}
                  disabled={idx === 0}>&uarr;</button>
                <button className="chore-chain__sort-button" onClick={this.moveChoreDown.bind(this, idx)}
                  disabled={idx === chain.length - 1}>&darr;</button>
              </div>
            </li>)}
            </FlipMove>
          </ul>
          <div className="form__button-holder">
            <button className="form__button form__button--secondary"
              onClick={() => this.setState({ stage: 'selection' })}>Back</button>
            <button disabled={!canSave} className="form__button"
              onClick={this.saveChain.bind(this)}>Save</button>
          </div>
        </div>
        : null }
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
