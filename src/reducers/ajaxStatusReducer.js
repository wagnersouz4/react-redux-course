import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action) {
  const ajaxCallHasBegun = action.type == types.BEGIN_AJAX_CALL;
  const ajaxCallEndsInSuccess = actionTypeEndsInSuccess(action.type);
  const ajaxCallEndsInError = action.type == types.AJAX_CALL_ERROR ;

  if (ajaxCallHasBegun) {
    return state + 1;
  }
  else if (ajaxCallEndsInError || ajaxCallEndsInSuccess) {
    return state - 1;
  }
  return state;
}

