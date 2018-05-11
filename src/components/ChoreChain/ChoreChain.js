import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';

import * as routes from '../../constants/routes';

import './ChoreChain.css';
import checkIcon from '../../images/check.svg';

const ChainSelect = props => (
  <div className="chore-chain__section">
    <p>Select all the chores that are part of this chain</p>
    <ul className="chore-chain__options">
      {props.chores.map(chore =>
      <li key={chore.slug}>
        <label className="chore-chain__option">
          <input className="chore-chain__checkbox" type="checkbox" name={chore.slug}
            onChange={() => props.chooseChore(chore)}
            checked={props.chain.findIndex(item => item.slug === chore.slug) >= 0} />
          <span className="chore-chain__chore-title">{chore.title}</span>
          <div className="chore-chain__status">
            <img className="chore-chain__status-icon" src={checkIcon} alt="Include chore in chain" />
          </div>
        </label>
      </li>)}
    </ul>
    <div className="form__button-holder">
      <Link to={routes.CHORES} className="form__button form__button--secondary">Cancel</Link>
      <button disabled={!props.canSave} className="form__button"
        onClick={props.nextStage}>Next</button>
    </div>
  </div>
);

const ChainOrder = props => (
  <div className="chore-chain__section">
    <p>Choose the order that the chores should be done in</p>
    <ul className="chore-chain__options">
      <FlipMove>
      {props.chain.map((chore, idx) =>
      <li key={chore.slug} className="chore-chain__option">
        <span className="chore-chain__chore-title">{chore.title}</span>
        <div className="chore-chain__sort-buttons">
          <button className="chore-chain__sort-button" onClick={() => props.moveChoreUp(idx)}
            disabled={idx === 0}>&uarr;</button>
          <button className="chore-chain__sort-button" onClick={() => props.moveChoreDown(idx)}
            disabled={idx === props.chain.length - 1}>&darr;</button>
        </div>
      </li>)}
      </FlipMove>
    </ul>
    <div className="form__button-holder">
      <button className="form__button form__button--secondary"
        onClick={props.prevStage}>Back</button>
      <button disabled={!props.canSave} className="form__button"
        onClick={() => props.saveChain(props.chain)}>Save</button>
    </div>
  </div>
);

class ChoreChain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chain: [],
      stage: 'selection',
    };
  }

  chooseChore(chosenChore) {
    let chain = this.state.chain.slice();
    const newChain = chain.filter(chore => chore.slug !== chosenChore.slug);
    if (chain.length === newChain.length) {
      chain.push(chosenChore);
    } else {
      chain = newChain;
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

  render() {
    const { chores, saveChain } = this.props;
    if (!chores) return null;
    const { chain, stage } = this.state;
    const canSave = chain.length > 1;
    return (
      <div className="chore-chain">
        <h1 className="chore-chain__title">Create a Chain</h1>
        { stage === 'selection' ?
          <ChainSelect chores={chores} chain={chain} canSave={canSave}
            chooseChore={this.chooseChore.bind(this)}
            nextStage={() => { this.setState({ stage: 'sorting' }); }} />
        : null }
        { stage === 'sorting' ?
          <ChainOrder chain={chain} canSave={canSave}
            moveChoreUp={this.moveChoreUp.bind(this)}
            moveChoreDown={this.moveChoreDown.bind(this)}
            prevStage={() => { this.setState({ stage: 'selection' }); }}
            saveChain={saveChain} />
        : null }
      </div>
    );
  }
}

export default ChoreChain;
