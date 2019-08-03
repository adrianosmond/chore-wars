import { TIME_UNIT, MAX_CHORE_CURRENT_POINTS } from 'constants/constants';

export const getCurrentPoints = (chore, timeSinceChore, percentage) => {
  if (chore.frequency === 0) {
    return chore.pointsPerTime;
  }
  const multiplier = 1 + 1 / chore.frequency;
  const timeRemaining = timeSinceChore - chore.frequency;
  return Math.min(
    MAX_CHORE_CURRENT_POINTS,
    Math.round(
      (percentage / 100) * chore.pointsPerTime * multiplier ** timeRemaining,
    ),
  );
};

export const computedChoreProperties = (chore, now) => {
  const timePaused = chore.timePaused || 0;
  const timeSinceChore = (now - (chore.lastDone + timePaused)) / TIME_UNIT;
  const percentage =
    chore.frequency === 0
      ? 100
      : Math.min((100 * timeSinceChore) / chore.frequency, 100);
  const due = chore.lastDone + timePaused + chore.frequency * TIME_UNIT;
  const currentPoints = getCurrentPoints(chore, timeSinceChore, percentage);
  return {
    currentPoints,
    percentage,
    due,
  };
};

export const makeChoresArray = (chores, now = new Date().getTime()) =>
  Object.keys(chores).map(chore => ({
    ...chores[chore],
    id: chore,
    ...computedChoreProperties(chores[chore], now),
  }));
