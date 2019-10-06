import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { auth } from 'database';
import { useUser } from 'contexts/game';
import Container from 'components/Container';
import routes from 'constants/routes';
import LinkButton from 'components/LinkButton';
import classes from './Header.module.css';

const Header = () => {
  const user = useUser();
  const logout = useCallback(() => auth.signOut(), []);
  return (
    <div className={classes.header}>
      <Container>
        <div className={classes.wrapper}>
          <Link to={routes.HOME}>Chore Wars</Link>
          {user && <LinkButton onClick={logout}>Logout</LinkButton>}
        </div>
      </Container>
    </div>
  );
};

export default Header;
