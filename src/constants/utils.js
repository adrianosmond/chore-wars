import { TIME_UNIT } from './constants';

const sortByCurrentPoints = (a, b) => b.currentPoints - a.currentPoints;

const processChore = (chore) => {
  const timeSinceChore = (new Date().getTime() - chore.lastDone) / TIME_UNIT;
  const timeRemaining = timeSinceChore - chore.frequency;
  const percentage = Math.min((100 * timeSinceChore) / chore.frequency, 100);
  const multiplier = 1 + (1 / chore.frequency);
  const due = chore.lastDone + (chore.frequency * TIME_UNIT);
  return {
    currentPoints: Math.round((percentage / 100) *
      chore.pointsPerTime * (multiplier ** timeRemaining)),
    percentage,
    due,
  };
};

const convertChoresToArray = (choresObj) => {
  const choresArr = Object.keys(choresObj).map((key) => {
    const chore = choresObj[key];
    return {
      ...chore,
      slug: key,
      ...processChore(chore),
    };
  });

  choresArr.sort(sortByCurrentPoints);

  return choresArr;
};


const makeSlug = title => title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');

export {
  convertChoresToArray,
  makeSlug,
  processChore,
  sortByCurrentPoints,
};
