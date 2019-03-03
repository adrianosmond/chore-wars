import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'avataaars';
import PropTypes from 'prop-types';

import { avatarOptions } from 'constants/avatars';
import * as routes from 'constants/routes';

import './AvatarGrid.css';

const AvatarGrid = ({ avatar, editing, onSelect }) => (
  <ul className="avatar-grid">
    {avatarOptions[editing].map((option) => {
      const avatarProps = {
        ...avatar,
        [editing]: option,
      };
      return (
        <li className="avatar-grid__option" key={option}>
          <Link to={routes.EDIT_PROFILE} onClick={() => onSelect(option)}>
            <Avatar {...avatarProps} style={{ width: '100%', height: '100%' }} />
          </Link>
        </li>
      );
    })}
  </ul>
);

AvatarGrid.propTypes = {
  avatar: PropTypes.objectOf(PropTypes.any).isRequired,
  editing: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default AvatarGrid;
