import React, { useCallback } from 'react';
import { stopHoliday } from 'database/game';
import { useGame, useHoliday } from 'contexts/game';
import InfoPanel from 'components/InfoPanel';
import Button from 'components/Button';
import { CampIcon } from 'components/Icon';

const HolidayContainer = () => {
  const game = useGame();
  const holidayStartTime = useHoliday();
  const endHoliday = useCallback(() => stopHoliday(game, holidayStartTime), [
    holidayStartTime,
    game,
  ]);
  return (
    <InfoPanel
      Icon={CampIcon}
      title="Put your feet up!"
      description="The game is paused while you're on holiday. When you come back let us know and you can pick things up where you left off."
      cta={<Button onClick={endHoliday}>We're back!</Button>}
    />
  );
};

export default HolidayContainer;
