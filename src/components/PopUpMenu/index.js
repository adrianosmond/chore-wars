import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const makeLink = (child, idx) =>
  <Link to={child.to} className="pop-up-menu__item" key={idx}>{child.text}</Link>;

const makeButton = (child, idx, onClick) =>
  <button onClick={onClick} className="pop-up-menu__item" key={idx}>{child.text}</button>;

class PopUpMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: props.side || 'right',
      visible: false,
    };
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { side, visible } = this.state;
    return (
      <div className={`pop-up-menu ${this.props.extraClasses}`}>
        <button className="pop-up-menu__button" onClick={this.toggleMenu.bind(this)} data-test="toggle-menu">
          { this.props.children }
        </button>
        <div className={`pop-up-menu__menu pop-up-menu__menu--${side}${visible ? ' pop-up-menu__menu--visible' : ''}`}>
          { this.props.options.map((child, idx) => {
            if (child.type === 'link') {
              return makeLink(child, idx);
            } else if (child.type === 'button') {
              return makeButton(child, idx, () => {
                this.toggleMenu();
                child.onClick();
              });
            }
            return null;
          }) }
        </div>
      </div>
    );
  }
}

export default PopUpMenu;
