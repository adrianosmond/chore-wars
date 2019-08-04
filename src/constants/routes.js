export const createSingleChoreLink = id => `/chore/${id}`;
export const createEditChoreLink = id => `/chore/${id}/edit`;
export const createForgotToLogLink = id => `/chore/${id}/forgot-to-log`;

const routes = {
  HOME: '/',
  NEW_CHORE: '/chore/new',
  MANAGE_CHAINS: '/chore/chain',
  SINGLE_CHORE: createSingleChoreLink(':id'),
  EDIT_CHORE: createEditChoreLink(':id'),
  FORGOT_TO_LOG: createForgotToLogLink(':id'),
};

export default routes;
