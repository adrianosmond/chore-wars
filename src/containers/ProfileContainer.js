import React, { useState, useCallback } from 'react';
import { useUser, usePlayersObj } from 'contexts/game';
import Typography from 'components/Typography';
import Input from 'components/Input';
import Accordion from 'components/Accordion';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import Button from 'components/Button';

const ProfileContainer = () => {
  const [name, setName] = useState(usePlayersObj()[useUser()].name);
  const updateName = useCallback(e => setName(e.target.value), []);

  const [password, setPassword] = useState('');
  const updatePassword = useCallback(e => setPassword(e.target.value), []);

  const [newPassword, setNewPassword] = useState('');
  const updateNewPassword = useCallback(
    e => setNewPassword(e.target.value),
    [],
  );

  const [newPassword2, setNewPassword2] = useState('');
  const updateNewPassword2 = useCallback(
    e => setNewPassword2(e.target.value),
    [],
  );

  const isNameInvalid = name.length === 0;
  const isPasswordInvalid =
    password.length === 0 ||
    newPassword.length === 0 ||
    newPassword !== newPassword2;

  const changePassword = () => {};
  const saveName = () => {};

  return (
    <>
      <Typography appearance="h1">Profile</Typography>
      <Accordion title="Personal details" startExpanded={true}>
        <Spacer>
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={updateName}
            spacing="xs"
          />
          <FormButtonHolder>
            <Button onClick={saveName} disabled={isNameInvalid}>
              Save details
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Accordion>
      <Accordion title="Password">
        <Spacer>
          <Input
            type="password"
            label="Current password"
            value={password}
            onChange={updatePassword}
            spacing="xs"
          />
          <Input
            type="password"
            label="New password"
            value={newPassword}
            onChange={updateNewPassword}
            spacing="xs"
          />
          <Input
            type="password"
            label="Confirm new password"
            value={newPassword2}
            onChange={updateNewPassword2}
            spacing="xs"
          />
          <FormButtonHolder>
            <Button onClick={changePassword} disabled={isPasswordInvalid}>
              Change password
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Accordion>
    </>
  );
};

export default ProfileContainer;
