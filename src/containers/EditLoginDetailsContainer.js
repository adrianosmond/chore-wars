import React, { useState, useCallback } from 'react';
import { useUserProfile } from 'contexts/game';
import { updatePlayerLogin } from 'database/players';
import Input from 'components/Input';
import Accordion from 'components/Accordion';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import Button from 'components/Button';
import Typography from 'components/Typography';

const EditLoginDetailsContainer = () => {
  const [password, setPassword] = useState('');
  const updatePassword = useCallback(e => setPassword(e.target.value), []);

  const existingEmail = useUserProfile().email;
  const [email, setEmail] = useState(existingEmail);
  const updateEmail = useCallback(e => setEmail(e.target.value), []);

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

  const isFormInvalid =
    email.length < 6 ||
    !email.includes('@') ||
    (newPassword.length === 0 && email === existingEmail) ||
    password.length === 0 ||
    newPassword !== newPassword2;

  const updateLoginDetails = () =>
    updatePlayerLogin(
      password,
      email === existingEmail ? undefined : email,
      newPassword.length === 0 ? undefined : newPassword,
    );

  return (
    <>
      <Accordion title="Login details">
        <Spacer>
          <Typography>
            Before changing your email or password, please first confirm your
            current password
          </Typography>
          <Input
            type="password"
            label="Current password"
            value={password}
            onChange={updatePassword}
            spacing="xs"
          />
          <Typography>&nbsp;</Typography>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={updateEmail}
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
            <Button onClick={updateLoginDetails} disabled={isFormInvalid}>
              Change login details
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Accordion>
    </>
  );
};

export default EditLoginDetailsContainer;
