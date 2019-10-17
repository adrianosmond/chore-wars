import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import Typography from 'components/Typography';
import classes from './Accordion.module.css';

const Accordion = ({ title, children, startExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(startExpanded);
  const toggleOpen = useCallback(() => setIsExpanded(e => !e), []);
  return (
    <div className={classes.wrapper}>
      <button className={classes.button} onClick={toggleOpen}>
        <Typography appearance="h3">{title}</Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={classnames({
            [classes.chevron]: true,
            [classes.isExpanded]: isExpanded,
          })}
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      {isExpanded && <div className={classes.content}>{children}</div>}
    </div>
  );
};

Accordion.propTypes = {
  // bla: PropTypes.string,
};

Accordion.defaultProps = {
  // bla: 'test',
};

export default Accordion;
