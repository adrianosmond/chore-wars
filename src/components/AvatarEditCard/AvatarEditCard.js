import React from 'react';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import { Avatar } from 'components/Icon';
import Button from 'components/Button';
import classes from './AvatarEditCard.module.css';

const AvatarEditCard = ({ editAvatar }) => (
  <Card>
    <Spacer>
      <Avatar className={classes.avatar} />
      <Button className={classes.button} onClick={editAvatar}>
        Edit avatar
      </Button>
    </Spacer>
  </Card>
);

AvatarEditCard.propTypes = {
  // bla: PropTypes.string,
};

AvatarEditCard.defaultProps = {
  // bla: 'test',
};

export default AvatarEditCard;
