import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from 'contexts/game';
import Container from 'components/Container';
import routes from 'constants/routes';
import ProfileMenu from 'components/ProfileMenu';
import LinkButton from 'components/LinkButton';
import classes from './Header.module.css';

const Header = () => {
  const user = useUser();
  const history = useHistory();
  const currentPath = history.location.pathname;

  return (
    <div className={classes.header}>
      <Container>
        <div className={classes.wrapper}>
          <Link to={routes.HOME}>Chore Wars</Link>
          {user && <ProfileMenu />}
          {!user && currentPath !== routes.LOGIN && (
            <LinkButton appearance="secondary" to={routes.LOGIN}>
              Log in
            </LinkButton>
          )}
          {!user && currentPath === routes.LOGIN && (
            <LinkButton appearance="secondary" to={routes.HOME}>
              Sign up
            </LinkButton>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
