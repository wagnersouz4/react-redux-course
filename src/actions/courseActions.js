import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; // the only requirement is to have type, and then we can have as many properties as needed
}

// exporting as it will be used in the test. Should care tough, as this kind of tests are rather than simple.
export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return CourseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) { // getState is not being used, just placed here to remember that in larger application could be useful to gather peaces of data to conform to request.
    dispatch(beginAjaxCall());
    return CourseApi.saveCourse(course).then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}