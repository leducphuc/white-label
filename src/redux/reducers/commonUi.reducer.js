import { DIALOG_POPUP } from '../actions';

const dialogPopupInitialState = {
  show: false,
  info: null,
}

export const dialogPopupStore = (state = dialogPopupInitialState, action) => {
  switch (action.type) {
    case DIALOG_POPUP.SHOW:
      return {
        show: true,
        info: action.info,
      }
    case DIALOG_POPUP.HIDE:
      return { ...dialogPopupInitialState }
    default:
      return state;
  }
}
