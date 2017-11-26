import { combineReducers } from 'redux';
import courses from './courseReducer'; // to be clear in the editor
import authors from './authorReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  numAjaxCallsInProgress
});

export default rootReducer;