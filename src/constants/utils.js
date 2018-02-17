import { TIME_UNIT } from './constants';

const sortByCurrentPoints = (a, b) => b.currentPoints - a.currentPoints;

const computedChoreProperties = (chore, now) => {
  const timeSinceChore = (now - chore.lastDone) / TIME_UNIT;
  const timeRemaining = timeSinceChore - chore.frequency;
  const percentage = Math.min((100 * timeSinceChore) / chore.frequency, 100);
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

const convertChoresToArray = (choresObj, now = new Date().getTime()) => {
  const choresArr = Object.keys(choresObj).map((key) => {
    const chore = choresObj[key];
    return {
      ...chore,
      slug: key,
      ...computedChoreProperties(chore, now),
    };
  });

  choresArr.sort(sortByCurrentPoints);

  return choresArr;
};


const makeSlug = title => title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');

export {
  convertChoresToArray,
  makeSlug,
  computedChoreProperties,
  sortByCurrentPoints,
};
