export const createSingleChoreLink = (id) => `/chore/${id}`;
export const createEditChoreLink = (id) => `/chore/${id}/edit`;
export const createForgotToLogLink = (id) => `/chore/${id}/forgot-to-log`;

export const createPlayerProfileLink = (id) => `/player/${id}`;

const routes = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  NEW_CHORE: '/chore/new',
  MANAGE_CHAINS: '/chore/chain',
  PROFILE: '/profile',
  PLAYER: createPlayerProfileLink(':id'),
  SINGLE_CHORE: createSingleChoreLink(':id'),
  EDIT_CHORE: createEditChoreLink(':id'),
  FORGOT_TO_LOG: createForgotToLogLink(':id'),
};

export default routes;
