import React, { useState, useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { auth } from 'database';
import { useCurrentPlayer } from 'contexts/game';
import routes from 'constants/routes';
import useOutsideClick from 'hooks/useOutsideClick';
import Avatar from 'components/Avatar';
import UnstyledList from 'components/UnstyledList';
import LinkButton from 'components/LinkButton';
import classes from './ProfileMenu.module.css';

const ProfileMenu = () => {
  const ref = useRef();
  const { avatar } = useCurrentPlayer();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(e => {
    setIsMenuOpen(open => !open);
    e.stopPropagation();
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const history = useHistory();
  const logout = useCallback(
    () => auth.signOut().then(history.push(routes.HOME)),
    [history],
  );

  useOutsideClick(ref, closeMenu);

  return (
    <div className={classes.profileMenu} ref={ref}>
      <Avatar onClick={toggleMenu} className={classes.avatar} url={avatar} />
      {isMenuOpen && (
        <nav className={classes.menu}>
          <UnstyledList>
            <UnstyledList.Item>
              <Link to={routes.PROFILE} className={classes.menuItem}>
                Profile
              </Link>
            </UnstyledList.Item>
            <UnstyledList.Item>
              <LinkButton onClick={logout} className={classes.menuItem}>
                Logout
              </LinkButton>
            </UnstyledList.Item>
          </UnstyledList>
        </nav>
      )}
    </div>
  );
};

export default ProfileMenu;
