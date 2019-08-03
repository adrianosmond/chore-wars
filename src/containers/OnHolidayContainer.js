import React, { useCallback } from 'react';
import { stopHoliday } from 'database/game';
import { useGame } from 'contexts/game';
import { useHoliday } from 'contexts/holiday';
import LinkButton from 'components/LinkButton';

const HolidayContainer = () => {
  const game = useGame();
  const holidayStartTime = useHoliday();
  const endHoliday = useCallback(() => stopHoliday(game, holidayStartTime), [
    holidayStartTime,
    game,
  ]);
  return (
    <div>
      The game is paused while you're on holiday.
      <LinkButton onClick={endHoliday}>We're back!</LinkButton>
    </div>
  );
};

export default HolidayContainer;
