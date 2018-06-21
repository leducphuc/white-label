import { put, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

export function* fetchAction(action, endpoint, config, callback, errorMessage) {
  yield put(action.request());
  const { response, error } = yield call(callApi, endpoint, config, callback);
  if (response) {
    yield put(action.success(response));
  } else {
    yield put(action.failure(error));
    // yield put(errorModal(message));
  }
  console.log(response, error, '');
  return { response, error };
}

export function* fetchPureAction(endpoint, config, callback) {
  const { response, error } = yield call(callApi, endpoint, config, callback);
  return { response, error };
}

export function callApi(
  endpoint,
  config,
  callback,
) {
  return fetch(endpoint, config)
  .then(response => {
    console.log(response, 'this is res');
    return response.text().then(text => ({ text, response }));
  })
  .then(({ text, response }) => {
    const json = JSON.parse(text !== '' ? text : '{}');
    if (!response.ok) {
      if (callback && callback.onError) {
        callback.onError(json);
      }
      const error = new Error(json.message ? json.message : response.statusText);
      throw error;
    } else {
      if (callback && callback.onSuccess) {
        callback.onSuccess(json);
      }
      return json;
    }
  })
  .then(
    response => ({ response }),
    error => ({ error: error.message || 'Something bad happened.' })
  );
}
