import React from 'react';
import classnames from 'classnames';
import { ReactComponent as Add } from './add.svg';
import { ReactComponent as AvatarImg } from './avatar.svg';
import { ReactComponent as Broom } from './broom.svg';
import { ReactComponent as Camp } from './camp.svg';
import { ReactComponent as Close } from './close.svg';
import { ReactComponent as Cloth } from './cloth.svg';
import { ReactComponent as Confetti } from './confetti.svg';
import { ReactComponent as Delete } from './delete.svg';
import { ReactComponent as Edit } from './edit.svg';
import { ReactComponent as Holiday } from './holiday.svg';
import { ReactComponent as Late } from './late.svg';
import { ReactComponent as Link } from './link.svg';
import { ReactComponent as Save } from './save.svg';
import { ReactComponent as Spinner } from './spinner.svg';
import { ReactComponent as Spray } from './spray.svg';
import avatarStyles from './avatar.module.css';

export const AddIcon = Add;
export const BroomIcon = Broom;
export const CampIcon = Camp;
export const CloseIcon = Close;
export const ClothIcon = Cloth;
export const ConfettiIcon = Confetti;
export const DeleteIcon = Delete;
export const EditIcon = Edit;
export const HolidayIcon = Holiday;
export const LateIcon = Late;
export const LinkIcon = Link;
export const SaveIcon = Save;
export const SpinnerIcon = Spinner;
export const SprayIcon = Spray;

export const AvatarPlaceholder = ({ className, ...props }) => (
  <AvatarImg
    className={classnames({
      [avatarStyles.avatar]: true,
      [className]: className,
    })}
    {...props}
  />
);
