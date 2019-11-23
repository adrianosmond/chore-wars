import { JOIN_CODE_LENGTH } from 'constants/constants';

// eslint-disable-next-line import/prefer-default-export
export const createJoinCode = () =>
  new Array(JOIN_CODE_LENGTH)
    .fill(97)
    .map(x => String.fromCharCode(x + Math.round(Math.random() * 25)))
    .join('');
