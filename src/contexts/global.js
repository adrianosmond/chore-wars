import React from 'react';
import { UserProvider } from './user';
import { GameProvider } from './game';
import { HolidayProvider } from './holiday';
import { ChoresProvider } from './chores';
import { PlayersProvider } from './players';

const GlobalProvider = ({ children }) => (
  <UserProvider>
    <GameProvider>
      <HolidayProvider>
        <PlayersProvider>
          <ChoresProvider>{children}</ChoresProvider>
        </PlayersProvider>
      </HolidayProvider>
    </GameProvider>
  </UserProvider>
);

export default GlobalProvider;
