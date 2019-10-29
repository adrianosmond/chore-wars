import React from 'react';
import classnames from 'classnames';
import Header from 'components/Header';
import Container from 'components/Container';
import classes from './Layout.module.css';

const Layout = ({ header, primary, secondary }) => {
  return (
    <div className={classes.layout}>
      <Header />
      <div className={classes.body}>
        <Container>
          {header && <div className={classes.header}>{header}</div>}
          <div className={classes.wrapper}>
            <div className={classes.primary}>{primary}</div>
            {secondary && (
              <div
                className={classnames({
                  [classes.secondary]: true,
                  [classes.secondaryBig]: !primary,
                  [classes.secondarySpaced]: !header,
                })}
              >
                {secondary}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
