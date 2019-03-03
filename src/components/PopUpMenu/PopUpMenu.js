import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './PopUpMenu.css';

const makeLink = (child, idx) => (
  <Link to={child.to} className="pop-up-menu__item" key={idx}>{child.text}</Link>
);

const makeButton = (child, idx, onClick) => (
  <button type="button" onClick={onClick} className="pop-up-menu__item" key={idx}>{child.text}</button>
);

class PopUpMenu extends Component {
  constructor(props) {
    super(props);
    const { side } = props;
    this.state = {
      side: side || 'right',
      visible: false,
    };
  }

  toggleMenu() {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  render() {
    const { side, visible } = this.state;
    const { extraClasses, children, options } = this.props;
    return (
      <div className={`pop-up-menu ${extraClasses}`}>
        <button
          type="button"
          className="pop-up-menu__button"
          onClick={this.toggleMenu.bind(this)}
          data-test="toggle-menu"
        >
          { children }
        </button>
        <div className={`pop-up-menu__menu pop-up-menu__menu--${side}${visible ? ' pop-up-menu__menu--visible' : ''}`}>
          { options.map((child, idx) => {
            if (child.type === 'link') {
              return makeLink(child, idx);
            } if (child.type === 'button') {
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

PopUpMenu.propTypes = {
  side: PropTypes.string,
  extraClasses: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PopUpMenu.defaultProps = {
  side: 'right',
  extraClasses: '',
  children: null,
};

export default PopUpMenu;
