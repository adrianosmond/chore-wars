import React from 'react';
import Avatar from 'avataaars';

import { avatarOptions } from '../../constants/avatars';

import './index.css';

const AvatarGrid = ({ editing, avatar, updateAvatar }) =>
  <ul className="avatar-grid">
    {avatarOptions[editing].map((option, idx) => {
      const avatarProps = {
        ...avatar,
        [editing]: option,
      };
      return (
        <li className="avatar-grid__option" key={idx} onClick={() => {
          updateAvatar(editing, option);
        }}>
          <Avatar { ...avatarProps} style={{ width: '100%', height: '100%' }} />
        </li>
      );
    })}
  </ul>;

export default AvatarGrid;
