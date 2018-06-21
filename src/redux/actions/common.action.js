const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const createRequestTypes = (base) => [
  REQUEST,
  SUCCESS,
  FAILURE,
].reduce((acc, type) => {
  acc[type] = `${base}_${type}`;
  return acc;
}, {});

export const createActionTypes = (base, types) => types.reduce((acc, type) => {
  acc[type] = `${base}_${type}`;
  return acc;
}, {});

export const action = (type, payload = {}) => ({
  type,
  ...payload,
});
