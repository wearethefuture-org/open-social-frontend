import { HIDE_MODAL, SHOW_MODAL } from '../constants';

export function showModal(modalParameters) {
  return {
    type: SHOW_MODAL,
    ...modalParameters,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}
