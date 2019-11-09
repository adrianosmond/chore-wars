import React from 'react';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import { Avatar } from 'components/Icon';
import Button from 'components/Button';
import classes from './AvatarCard.module.css';

const AvatarEditCard = ({ editAvatar }) => (
  <Card>
    <Spacer>
      <Avatar className={classes.avatar} />
      {editAvatar && (
        <Button
          className={classes.button}
          onClick={editAvatar}
          appearance="secondary"
        >
          Edit avatar
        </Button>
      )}
    </Spacer>
  </Card>
);

export default AvatarEditCard;
