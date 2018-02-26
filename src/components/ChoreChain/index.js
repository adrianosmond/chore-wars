import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../withAuthorization';
import { convertChoresToArray } from '../../constants/utils';
import { loadChores } from '../../actions/choreActions';

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

  render() {
    const { chores, chain } = this.state;
    if (!chores) return null;
    const choresArr = convertChoresToArray(chores).filter(chore => !chore.enables);
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
          {chain.map(chore => <li key={chore.slug}>{chore.title}</li>)}
        </ul>
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
});

const authCondition = authUser => !!authUser;
const isLoading = state => !state.choresLoaded;

export { ChoreChain };

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
)(ChoreChain);
