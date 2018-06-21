import { USER_LIST } from '../actions';

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
    case USER_LIST.SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        userList: action.info,
      }
    case USER_LIST.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case USER_LIST.SORT:
      return {
        ...state,
        userList,
      }
    default:
      break;
  }
}

const sortUsers = (userList, condition) => {

}

export default userListStore;
