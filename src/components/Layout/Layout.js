import React from 'react';
import HeaderContainer from 'containers/HeaderContainer';
import Container from 'components/Container';
import classes from './Layout.module.css';

const Layout = ({ header, primary, secondary }) => {
  return (
    <div>
      <HeaderContainer />
      <div className={classes.body}>
        <Container>
          {header && <div className={classes.header}>{header}</div>}
          <div className={classes.wrapper}>
            <div className={classes.primary}>{primary}</div>
            {secondary && <div className={classes.secondary}>{secondary}</div>}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
