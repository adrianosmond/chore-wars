import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Container from 'components/Container';
import IconButton from 'components/IconButton';
import { CloseIcon } from 'components/Icon';
import classes from './Notification.module.css';

const Notification = ({
  children,
  appearance = 'success',
  hideAfter = 3000,
  closeNotification,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideNotification = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let timeout;
    if (!isVisible) {
      timeout = setTimeout(closeNotification, 300);
    }
    return () => clearTimeout(timeout);
  }, [closeNotification, isVisible]);

  useEffect(() => {
    let timeout;
    if (hideAfter && isVisible) {
      timeout = setTimeout(() => setIsVisible(false), hideAfter);
    }
    return () => clearTimeout(timeout);
  }, [hideAfter, isVisible]);

  return ReactDOM.createPortal(
    <div
      className={classnames({
        [classes.notification]: true,
        [classes.visible]: isVisible,
        [classes[appearance]]: true,
      })}
    >
      <Container>
        <div className={classes.content}>
          <div className={classes.message}>{children}</div>
          <IconButton Icon={CloseIcon} onClick={hideNotification} />
        </div>
      </Container>
    </div>,
    document.getElementById('notification-root'),
  );
};

export default Notification;
