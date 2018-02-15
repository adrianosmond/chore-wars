import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as routes from '../../constants/routes';

import { removeChore } from '../../actions/choreActions';

import './index.css';

class ChoreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  removeChore() {
    this.toggleMenu();
    this.props.removeChore(this.props.game, this.props.slug);
  }

  render() {
    return (
      <div className="chore-menu">
        <button className="chore-menu__button" onClick={this.toggleMenu.bind(this)}>
          <span className="chore-menu__button-icon">…</span>
        </button>
        { this.state.visible ?
          <div className="chore-menu__menu">
            <Link to={`${routes.EDIT_CHORE}/${this.props.slug}`} className="chore-menu__item">Edit</Link>
            <button className="chore-menu__item" onClick={this.removeChore.bind(this)}>Delete</button>
          </div> : null }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.session.game.gameId,
});

const mapDispatchToProps = dispatch => ({
  removeChore: (game, slug) => dispatch(removeChore(game, slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChoreMenu);
