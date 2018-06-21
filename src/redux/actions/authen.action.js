import { createActionTypes, action } from '../actions';

export const AUTHEN =
  createActionTypes('AUTHEN',
  ['FETCH', 'REQUEST', 'SUCCESS', 'FAILURE', 'HOOK', 'CLEAR', 'CREATE', 'UPDATE']);
export const authen = {
  fetch: (body, callback) =>
    action(AUTHEN.FETCH, { body, callback }),
  request: () => action(AUTHEN.REQUEST),
  success: (info) => action(AUTHEN.SUCCESS, { info }),
  failure: (error) => action(AUTHEN.FAILURE, { error }),
  getName: () => 'AUTHEN',
};
