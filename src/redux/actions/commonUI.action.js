import { createActionTypes, action } from '../actions';

export const DIALOG_POPUP = createActionTypes('DIALOG_POPUP', ['SHOW', 'HIDE']);
export const dialogPopup = {
  show: (info) => action(DIALOG_POPUP.SHOW, { info }),
  hide: () => action(DIALOG_POPUP.HIDE)
}
