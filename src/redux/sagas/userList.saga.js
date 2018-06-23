import { put, call, takeLatest } from 'redux-saga/effects';
import { CUSTOMER_API } from '../../constants';
import {
  USER_LIST, userList,
} from '../actions';
import { getHeaders } from '../../utils';
import { fetchAction } from './saga.common';

import mockData from './mockdata';

export function* fetchUserList({ filter, page, size, callback }) {
  console.log('fetch user');
  const config = {
    method: 'GET',
    headers: getHeaders(),
  };

  const filterParams = () => {
    let filterString = `page=${page}&size=${size}`;
    for (const key in filter) {
      const filterValue = filter[key] ? `&${key}=${filter[key]}` : '';
      filterString += filterValue;
    }
    return filterString;
  };

  const url = `${CUSTOMER_API}/foreign/subAccounts?${filterParams()}`
  // yield call(fetchAction, userList, url, config, callback);
  yield put(userList.success(mockData));

}

/* FUNCTIONAL */

/* WATCHERS */

export function* watchFetchUserList() {
  console.log('watcher');
  yield takeLatest(USER_LIST.FETCH, fetchUserList);
}
