import React from 'react';
import Container from 'components/Container';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <Container>Chore Wars</Container>
    </div>
  );
};

export default Header;
