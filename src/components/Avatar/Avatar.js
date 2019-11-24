import React from 'react';
import classnames from 'classnames';
import { AvatarPlaceholder } from 'components/Icon';
import classes from './Avatar.module.css';

const Avatar = ({ url, className, ...props }) => {
  if (!url) {
    return <AvatarPlaceholder className={className} {...props} />;
  }

  return (
    <img
      className={classnames([classes.avatar, className])}
      src={url}
      alt=""
      {...props}
    />
  );
};

export default Avatar;
