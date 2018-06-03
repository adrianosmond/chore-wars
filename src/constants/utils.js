import { TIME_UNIT, JOIN_CODE_LENGTH } from 'constants/constants';
import { DefaultAvatar } from 'constants/avatars';

const sortByCurrentPoints = (a, b) => b.currentPoints - a.currentPoints;

const computedChoreProperties = (chore, now) => {
  const timePaused = chore.timePaused || 0;
  const timeSinceChore = (now - (chore.lastDone + timePaused)) / TIME_UNIT;
  const timeRemaining = timeSinceChore - chore.frequency;
  const percentage = chore.frequency === 0 ? 100 :
    Math.min((100 * timeSinceChore) / chore.frequency, 100);
  const multiplier = chore.frequency === 0 ? 1 : 1 + (1 / chore.frequency);
  const due = chore.lastDone + timePaused + (chore.frequency * TIME_UNIT);
  const currentPoints = chore.frequency === 0 ? chore.pointsPerTime :
    Math.round((percentage / 100) * chore.pointsPerTime * (multiplier ** timeRemaining));
  return {
    currentPoints,
    percentage,
    due,
  };
};

const processChore = (chore, slug, now) => ({
  ...chore,
  slug,
  ...computedChoreProperties(chore, now),
});

const convertChoresToArray = (choresObj, now = new Date().getTime()) =>
  Object.keys(choresObj)
    .map(slug => processChore(choresObj[slug], slug, now))
    .sort(sortByCurrentPoints);

const getFilteredChoresArray = chores =>
  convertChoresToArray(chores).filter(chore => !chore.isWaiting);

const makeSlug = title => title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');

const createJoinCode = () => new Array(JOIN_CODE_LENGTH).fill(97).map(x =>
  String.fromCharCode(x + Math.round(Math.random() * 25))).join('');

const generatePlayerData = (playerName, joinCode) => {
  const data = {
    avatar: DefaultAvatar,
    name: playerName,
  };
  if (joinCode) {
    data.joinCode = joinCode;
  }
  return data;
};

const makePlayersArray = players => Object.keys(players).map(player => ({
  ...players[player],
  id: player,
}));

const filterAndSortChores = (chores) => {
  if (!chores) return null;
  return convertChoresToArray(chores)
    .sort((a, b) => {
      if (a.slug < b.slug) return -1;
      if (b.slug < a.slug) return 1;
      return 0;
    })
    .filter(chore => !chore.enables);
};

export {
  computedChoreProperties,
  convertChoresToArray,
  createJoinCode,
  filterAndSortChores,
  generatePlayerData,
  getFilteredChoresArray,
  makePlayersArray,
  makeSlug,
  processChore,
  sortByCurrentPoints,
};
