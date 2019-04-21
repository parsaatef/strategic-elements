import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MESSAGE,
  APPLY_CONFIRM,
  RESET_CONFIRM
} from '../actions/confirmBox';

const defState = {
  status: false,
  message: '',
  confirmAction: () => {}
};

export default function confirm(state = defState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        status: true
      };
    case HIDE_MODAL:
      return {
        ...state,
        status: false
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case APPLY_CONFIRM:
      return {
        ...state,
        confirmAction: action.callback
      };
    case RESET_CONFIRM:
      return defState;
    default:
      return state;
  }
}
