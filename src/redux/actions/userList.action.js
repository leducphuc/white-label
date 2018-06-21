import { createActionTypes, action } from '../actions';

export const USER_LIST =
  createActionTypes('USER_LIST',
  ['FETCH', 'REQUEST', 'SUCCESS', 'FAILURE', 'SORT', 'FILTER']);
export const userList = {
  fetch: (filter, page, size, callback) =>
    action(USER_LIST.FETCH, { filter, page, size, callback }),
  request: () => action(USER_LIST.REQUEST),
  success: (info) => action(USER_LIST.SUCCESS, { info }),
  failure: (error) => action(USER_LIST.FAILURE, { error }),
  sort: (condition) => action(USER_LIST.SORT, { condition }),
  getName: () => 'USER_LIST',
};
