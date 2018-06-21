import { AUTHEN } from '../actions';

const initialState = {
  isFetching: false,
  loggedIn: false,
  error: null,
}

const authenStore = (state = initialState, action) => {
  switch (action.type) {
    case AUTHEN.REQUEST:
      return {
      ...state,
      isFetching: true,
    }
  case AUTHEN.SUCCESS:
    return {
    ...state,
    loggedIn: true,
    }
  case AUTHEN.FAILURE:
    return {
    ...initialState,
    error: action.info,
    }
  default:
    break;
  }
}

export default authenStore;
