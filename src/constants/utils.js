import { TIME_UNIT, JOIN_CODE_LENGTH, MAX_CHORE_CURRENT_POINTS } from 'constants/constants';
import { DefaultAvatar } from 'constants/avatars';

export const sortByCurrentPoints = (a, b) => {
  const aBonusPts = a.currentPoints > a.pointsPerTime;
  const bBonusPts = b.currentPoints > b.pointsPerTime;
  if (aBonusPts && !bBonusPts) {
    return -1;
  }
  if (bBonusPts && !aBonusPts) {
    return 1;
  }
  return b.currentPoints - a.currentPoints;
};

export const getCurrentPoints = (chore, timeSinceChore, percentage) => {
  const multiplier = chore.frequency === 0 ? 1 : 1 + (1 / chore.frequency);
  const timeRemaining = timeSinceChore - chore.frequency;
  return Math.min(
    MAX_CHORE_CURRENT_POINTS,
    chore.frequency === 0
      ? chore.pointsPerTime
      : Math.round((percentage / 100) * chore.pointsPerTime * (multiplier ** timeRemaining)),
  );
};

export const computedChoreProperties = (chore, now) => {
  const timePaused = chore.timePaused || 0;
  const timeSinceChore = (now - (chore.lastDone + timePaused)) / TIME_UNIT;
  const percentage = chore.frequency === 0 ? 100
    : Math.min((100 * timeSinceChore) / chore.frequency, 100);
  const due = chore.lastDone + timePaused + (chore.frequency * TIME_UNIT);
  const currentPoints = getCurrentPoints(chore, timeSinceChore, percentage);
  return {
    currentPoints,
    percentage,
    due,
  };
};

export const processChore = (chore, slug, now) => ({
  ...chore,
  slug,
  ...computedChoreProperties(chore, now),
});

export const convertChoresToArray = (
  choresObj,
  now = new Date().getTime(),
) => Object.keys(choresObj)
  .map(slug => processChore(choresObj[slug], slug, now))
  .sort(sortByCurrentPoints);

export const getFilteredChoresArray = chores => convertChoresToArray(chores)
  .filter(chore => !chore.isWaiting && (new Date().getTime() - chore.lastDone) >= 60000);

export const makeSlug = title => title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');

export const createJoinCode = () => new Array(JOIN_CODE_LENGTH)
  .fill(97)
  .map(x => String.fromCharCode(x + Math.round(Math.random() * 25))).join('');

export const generatePlayerData = (playerName, joinCode) => {
  const data = {
    avatar: DefaultAvatar,
    name: playerName,
  };
  if (joinCode) {
    data.joinCode = joinCode;
  }
  return data;
};

export const makePlayersArray = players => Object.keys(players).map(player => ({
  ...players[player],
  id: player,
}));

export const filterAndSortChores = (chores) => {
  if (!chores) return null;
  return convertChoresToArray(chores)
    .sort((a, b) => {
      if (a.slug < b.slug) return -1;
      if (b.slug < a.slug) return 1;
      return 0;
    })
    .filter(chore => !chore.enables);
};
