import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'avataaars';

import { avatarOptions } from '../../constants/avatars';
import * as routes from '../../constants/routes';

import './AvatarGrid.css';

const AvatarGrid = ({ editing, avatar, onSelect }) =>
  <ul className="avatar-grid">
    {avatarOptions[editing].map((option, idx) => {
      const avatarProps = {
        ...avatar,
        [editing]: option,
      };
      return (
        <li className="avatar-grid__option" key={idx}>
          <Link to={routes.EDIT_PROFILE} onClick={() => { onSelect(option); }}>
            <Avatar { ...avatarProps} style={{ width: '100%', height: '100%' }} />
          </Link>
        </li>
      );
    })}
  </ul>;

export default AvatarGrid;
