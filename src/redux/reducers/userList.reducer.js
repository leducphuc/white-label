import { USER_LIST } from '../actions';
import { orderBy } from 'lodash/collection';
import { USER_LIST_DATA } from '../../constants';

const initialState = {
  isFetching: false,
  userList: [],
  error: null,
  sorting: null,
}

const userListStore = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST.REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case USER_LIST.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        userList: sortUsers(action.info.foreignUsers, state.sorting),
      }
    }
    case USER_LIST.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case USER_LIST.SORT: {
      const sortedList = sortUsers(state.userList, action.condition);
      return {
        ...state,
        userList: sortedList,
      }
    }
    default:
      return state;
  }
}

const sortUsers = (userList, condition) => {
  if (userList.length === 0 || !condition) return userList;
  const { filter, isAsc } = condition;
  const field = USER_LIST_DATA.find(item => item.title === filter).value;
  const order = isAsc ? 'asc' : 'desc';
  return orderBy(userList, field, order);
}

export default userListStore;
