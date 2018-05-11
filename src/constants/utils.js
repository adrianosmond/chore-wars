import { TIME_UNIT } from './constants';

const sortByCurrentPoints = (a, b) => b.currentPoints - a.currentPoints;

const computedChoreProperties = (chore, now) => {
  const timeSinceChore = (now - chore.lastDone) / TIME_UNIT;
  const timeRemaining = timeSinceChore - chore.frequency;
  const percentage = chore.frequency === 0 ? 100 :
    Math.min((100 * timeSinceChore) / chore.frequency, 100);
  const multiplier = chore.frequency === 0 ? 1 : 1 + (1 / chore.frequency);
  const due = chore.lastDone + (chore.frequency * TIME_UNIT);
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

export {
  computedChoreProperties,
  convertChoresToArray,
  getFilteredChoresArray,
  makeSlug,
  processChore,
  sortByCurrentPoints,
};
