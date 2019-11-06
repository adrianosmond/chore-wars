import React, { useState, useCallback } from 'react';
import { useUserProfile, useGame, usePlayersObj } from 'contexts/game';
import { savePlayerName } from 'database/players';
import Input from 'components/Input';
import Accordion from 'components/Accordion';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import Button from 'components/Button';

const EditPersonalDetailsContainer = () => {
  const player = useUserProfile();
  const { uid: playerId } = player;
  const game = useGame();

  const [name, setName] = useState(usePlayersObj()[playerId].name);
  const updateName = useCallback(e => setName(e.target.value), []);

  const isFormInvalid = name.length === 0;

  const saveDetails = () => savePlayerName(game, playerId, name);

  return (
    <>
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
            <Button onClick={saveDetails} disabled={isFormInvalid}>
              Save details
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Accordion>
    </>
  );
};

export default EditPersonalDetailsContainer;
