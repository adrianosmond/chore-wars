import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';

import * as routes from 'constants/routes';

import Button from 'components/Button';

import checkIcon from 'images/check.svg';
import './ChoreChain.css';

const ChainSelect = ({
  chores, chain, chooseChore, canSave, nextStage,
}) => (
  <div className="chore-chain__section">
    <p>Select all the chores that are part of this chain</p>
    <ul className="chore-chain__options">
      {chores.map(chore => (
        <li key={chore.slug}>
          <label className="chore-chain__option">
            <input
              className="chore-chain__checkbox"
              type="checkbox"
              name={chore.slug}
              onChange={() => chooseChore(chore)}
              checked={chain.findIndex(item => item.slug === chore.slug) >= 0}
            />
            <span className="chore-chain__chore-title">{chore.title}</span>
            <div className="chore-chain__status">
              <img className="chore-chain__status-icon" src={checkIcon} alt="Include chore in chain" />
            </div>
          </label>
        </li>
      ))}
    </ul>
    <div className="form__button-holder">
      <Button to={routes.CHORES} variant="secondary">Cancel</Button>
      <Button disabled={!canSave} onClick={nextStage}>
        Next
      </Button>
    </div>
  </div>
);

ChainSelect.propTypes = {
  chores: PropTypes.arrayOf(PropTypes.object).isRequired,
  chain: PropTypes.arrayOf(PropTypes.object).isRequired,
  chooseChore: PropTypes.func.isRequired,
  canSave: PropTypes.bool.isRequired,
  nextStage: PropTypes.func.isRequired,
};

const ChainOrder = ({
  chain, moveChoreDown, moveChoreUp, prevStage, canSave, saveChain,
}) => (
  <div className="chore-chain__section">
    <p>Choose the order that the chores should be done in</p>
    <ul className="chore-chain__options">
      <FlipMove>
        {chain.map((chore, idx) => (
          <li key={chore.slug} className="chore-chain__option">
            <span className="chore-chain__chore-title">{chore.title}</span>
            <div className="chore-chain__sort-buttons">
              <button
                type="button"
                className="chore-chain__sort-button"
                onClick={() => moveChoreUp(idx)}
                disabled={idx === 0}
              >
                &uarr;
              </button>
              <button
                type="button"
                className="chore-chain__sort-button"
                onClick={() => moveChoreDown(idx)}
                disabled={idx === chain.length - 1}
              >
                &darr;
              </button>
            </div>
          </li>
        ))}
      </FlipMove>
    </ul>
    <div className="form__button-holder">
      <Button variant="secondary" onClick={prevStage}>
        Back
      </Button>
      <Button disabled={!canSave} onClick={() => saveChain(chain)}>
        Save
      </Button>
    </div>
  </div>
);

ChainOrder.propTypes = {
  chain: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveChoreUp: PropTypes.func.isRequired,
  moveChoreDown: PropTypes.func.isRequired,
  saveChain: PropTypes.func.isRequired,
  canSave: PropTypes.bool.isRequired,
  prevStage: PropTypes.func.isRequired,
};

class ChoreChain extends Component {
  state = {
    chain: [],
    stage: 'selection',
  };

  static propTypes = {
    chores: PropTypes.arrayOf(PropTypes.object).isRequired,
    saveChain: PropTypes.func.isRequired,
  }

  chooseChore = (chosenChore) => {
    const { chain } = this.state;
    let chainClone = chain.slice();
    const newChain = chainClone.filter(chore => chore.slug !== chosenChore.slug);
    if (chainClone.length === newChain.length) {
      chainClone.push(chosenChore);
    } else {
      chainClone = newChain;
    }
    this.setState({
      chain: chainClone,
    });
  }

  moveChoreUp = (idx) => {
    const { chain } = this.state;
    const chainClone = chain.slice();
    if (chainClone.length === 1 || idx === 0) return;
    [chainClone[idx], chainClone[idx - 1]] = [chainClone[idx - 1], chainClone[idx]];
    this.setState({
      chain: chainClone,
    });
  }

  moveChoreDown = (idx) => {
    const { chain } = this.state;
    const chainClone = chain.slice();
    if (chainClone.length === 1 || idx === chainClone.length - 1) return;
    [chainClone[idx], chainClone[idx + 1]] = [chainClone[idx + 1], chainClone[idx]];
    this.setState({
      chain: chainClone,
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
        { stage === 'selection'
          ? (
            <ChainSelect
              chores={chores}
              chain={chain}
              canSave={canSave}
              chooseChore={this.chooseChore}
              nextStage={() => { this.setState({ stage: 'sorting' }); }}
            />
          )
          : null }
        { stage === 'sorting'
          ? (
            <ChainOrder
              chain={chain}
              canSave={canSave}
              moveChoreUp={this.moveChoreUp}
              moveChoreDown={this.moveChoreDown}
              prevStage={() => { this.setState({ stage: 'selection' }); }}
              saveChain={saveChain}
            />
          )
          : null }
      </div>
    );
  }
}

export { ChainSelect, ChainOrder };

export default ChoreChain;
