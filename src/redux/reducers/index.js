import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userListStore from './userList.reducer';
import { dialogPopupStore } from './commonUi.reducer';

const rootReducer = combineReducers({
  userListStore,
  dialogPopupStore,
  routing: routerReducer,
});

export default rootReducer;
