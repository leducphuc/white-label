import { put, call, takeLatest } from 'redux-saga/effects';
import { CUSTOMER_API } from '../../constants';
import {
  USER_LIST, userList,
} from '../actions';
import { getHeaders } from '../../utils';
import { fetchAction } from './saga.common';

export function* fetchUserList({ filter, page, size, callback }) {
  const config = {
    method: 'GET',
    headers: getHeaders(),
  };

  const filterParams = () => {
    let filterString = `page=${page || 1}&size=${size || 100}`;
    for (const key in filter) {
      const filterValue = filter[key] ? `&${key}=${filter[key]}` : '';
      filterString += filterValue;
    }
    return filterString;
  };

  const url = `${CUSTOMER_API}/foreign/subAccounts?${filterParams()}`
  const result = yield call(fetchAction, userList, url, config, callback);
  if (result.error) {
  } else if (result.response.length === 0) {
  } else {
  }
}

/* FUNCTIONAL */

/* WATCHERS */

export function* watchFetchUserList() {
  console.log('watcher');
  yield takeLatest(USER_LIST.FETCH, fetchUserList);
}
