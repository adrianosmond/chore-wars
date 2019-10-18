import React from 'react';
import classnames from 'classnames';
import { ReactComponent as Add } from './add.svg';
import { ReactComponent as AvatarImg } from './avatar.svg';
import { ReactComponent as Delete } from './delete.svg';
import { ReactComponent as Edit } from './edit.svg';
import { ReactComponent as Holiday } from './holiday.svg';
import { ReactComponent as Late } from './late.svg';
import { ReactComponent as Link } from './link.svg';
import { ReactComponent as Save } from './save.svg';
import avatarStyles from './avatar.module.css';

export const AddIcon = Add;
export const DeleteIcon = Delete;
export const EditIcon = Edit;
export const HolidayIcon = Holiday;
export const LateIcon = Late;
export const LinkIcon = Link;
export const SaveIcon = Save;

export const Avatar = ({ className, ...props }) => (
  <AvatarImg
    className={classnames({
      [avatarStyles.avatar]: true,
      [className]: className,
    })}
    {...props}
  />
);