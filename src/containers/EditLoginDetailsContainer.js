import React, { useState } from 'react';
import { useUserProfile } from 'contexts/game';
import { updatePlayerLogin } from 'database/players';
import useInput from 'hooks/useInput';
import useToggle from 'hooks/useToggle';
import Input from 'components/Input';
import Accordion from 'components/Accordion';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import Button from 'components/Button';
import Typography from 'components/Typography';
import Notification from 'components/Notification';

const EditLoginDetailsContainer = () => {
  const existingEmail = useUserProfile().email;
  const [error, setError] = useState('');
  const [email, updateEmail] = useInput(existingEmail);
  const [password, updatePassword, setPassword] = useInput('');
  const [newPassword, updateNewPassword, setNewPassword] = useInput('');
  const [newPassword2, updateNewPassword2, setNewPassword2] = useInput('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [
    successMessageVisible,
    showSuccessMessage,
    hideSuccessMessage,
  ] = useToggle(false);
  const [errorMessageVisible, showErrorMessage, hideErrorMessage] = useToggle(
    false,
  );

  const isFormInvalid =
    email.length < 6 ||
    !email.includes('@') ||
    (newPassword.length === 0 && email === existingEmail) ||
    password.length === 0 ||
    newPassword !== newPassword2;

  const updateLoginDetails = () => {
    setIsUpdating(true);
    updatePlayerLogin(
      password,
      email === existingEmail ? undefined : email,
      newPassword.length === 0 ? undefined : newPassword,
    )
      .then(() => {
        setPassword('');
        setNewPassword('');
        setNewPassword2('');
        showSuccessMessage();
      })
      .catch(err => {
        setError(err.message);
        showErrorMessage();
      })
      .then(() => setIsUpdating(false));
  };

  return (
    <>
      {successMessageVisible && (
        <Notification closeNotification={hideSuccessMessage}>
          Your details were successfully updated
        </Notification>
      )}
      {errorMessageVisible && (
        <Notification
          closeNotification={hideErrorMessage}
          appearance="error"
          hideAfter={5000}
        >
          Could not update your details: {error}
        </Notification>
      )}
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
            <Button
              onClick={updateLoginDetails}
              disabled={isFormInvalid || isUpdating}
              isBusy={isUpdating}
            >
              Change login details
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Accordion>
    </>
  );
};

export default EditLoginDetailsContainer;
