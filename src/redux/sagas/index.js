import { fork } from 'redux-saga/effects';
import { watchFetchUserList } from './userList.saga';

export default function* rootSaga() {
  yield [
    fork(watchFetchUserList),
  ];
}
