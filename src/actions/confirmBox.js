export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SET_MESSAGE = 'SET_MESSAGE';
export const APPLY_CONFIRM = 'APPLY_CONFIRM';
export const RESET_CONFIRM = 'RESET_MODAL';

export function showModal() {
  return {
    type: SHOW_MODAL
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    message
  };
}

export function applyConfirm(callback) {
  return {
    type: APPLY_CONFIRM,
    callback
  };
}

export function resetConfirm() {
  return {
    type: RESET_CONFIRM
  };
}
