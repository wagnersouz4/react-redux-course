import * as types from './actionTypes';

export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

export function ajaxCallError(error) {
  return { type: types.AJAX_CALL_ERROR, error };
}