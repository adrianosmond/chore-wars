import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from 'contexts/game';
import Container from 'components/Container';
import routes from 'constants/routes';
import ProfileMenu from 'components/ProfileMenu';
import classes from './Header.module.css';

const Header = () => {
  const user = useUser();

  return (
    <div className={classes.header}>
      <Container>
        <div className={classes.wrapper}>
          <Link to={routes.HOME}>Chore Wars</Link>
          {user && <ProfileMenu />}
        </div>
      </Container>
    </div>
  );
};

export default Header;
