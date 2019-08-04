import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/Container';
import routes from 'constants/routes';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <Container>
        <Link to={routes.HOME}>Chore Wars</Link>
      </Container>
    </div>
  );
};

export default Header;
