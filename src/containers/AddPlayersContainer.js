import React, { useEffect, useState, useCallback } from 'react';
import { database } from 'database';
import { lockGame } from 'database/game';
import { useGame } from 'contexts/game';
import Card from 'components/Card';
import InfoPanel from 'components/InfoPanel';
import LinkButton from 'components/LinkButton';
import { ConfirmModal } from 'components/Modal';
import Typography from 'components/Typography';

const AddPlayersContainer = () => {
  const game = useGame();
  const [joinCode, setJoinCode] = useState(null);

  const [showLockGameModal, setShowLockGameModal] = useState(false);
  const openLockGameModal = useCallback(() => setShowLockGameModal(true), []);
  const closeLockGameModal = useCallback(() => setShowLockGameModal(false), []);

  useEffect(() => {
    database.ref(`games/${game}/gameIncomplete`).once('value', result => {
      if (result.val()) {
        database
          .ref(`joinCodes`)
          .orderByValue()
          .equalTo(game)
          .once('value', code => setJoinCode(Object.keys(code.val())[0]));
      }
    });
  }, [game]);

  const lockTheGame = useCallback(() => {
    closeLockGameModal();
    lockGame(game, joinCode).then(() => setJoinCode(null));
  }, [closeLockGameModal, game, joinCode]);

  if (!joinCode) return null;

  return (
    <Card appearance="info">
      <InfoPanel
        size="s"
        title="Want to add players?"
        description={
          <>
            If you want people to split the chores with you and join your game,
            give them the code: <strong>{joinCode}</strong>. Once everyone has
            joined, you can{' '}
            <LinkButton onClick={openLockGameModal}>lock the game</LinkButton>{' '}
            and this message will go away
          </>
        }
      />
      {showLockGameModal && (
        <ConfirmModal
          closeModal={closeLockGameModal}
          confirmText="Yes, lock it"
          onConfirm={lockTheGame}
        >
          <Typography>Are you sure you want to lock the game?</Typography>
        </ConfirmModal>
      )}
    </Card>
  );
};

export default AddPlayersContainer;
