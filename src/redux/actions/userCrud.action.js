import { createActionTypes, action } from '../actions';

export const USER_CRUD =
  createActionTypes('USER_CRUD',
  ['FETCH', 'REQUEST', 'SUCCESS', 'FAILURE', 'UPDATE']);
export const userCrud = {
  fetch: (custId, callback) =>
    action(USER_CRUD.FETCH, { custId, callback }),
  request: () => action(USER_CRUD.REQUEST),
  success: (info, callback) => action(USER_CRUD.SUCCESS, { info, callback }),
  failure: (error) => action(USER_CRUD.FAILURE, { error }),
  update: (params) => action(USER_CRUD.UPDATE, { params }),
  getName: () => 'USER_CRUD',
};
