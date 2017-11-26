import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('should handle creating courses', () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const courseTitle = 'Clean Code';
    const course = {
      title: courseTitle
    };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const createdCourse = store.getState().courses[0];
    const expectedCourse = {
      title: courseTitle
    };

    expect(createdCourse).toEqual(expectedCourse);
  });

  it ('should handle updating courses', () => {

    // arrange
    const store = createStore(rootReducer, initialState);
    const courseId = 'Dan-Abramov';
    const course = {
      id: courseId,
      title: 'A Introduction to React'
    };

    // creating course
    let currentCourse;
    const createCourseAction = courseActions.createCourseSuccess(course);
    store.dispatch(createCourseAction);
    currentCourse = store.getState().courses[0];
    expect(currentCourse).toEqual(course);

    // act
    const updatedCourse = {
      id: courseId,
      title: 'Advanced React Course'
    };

    const updateCourseAction = courseActions.updateCourseSuccess(updatedCourse);
    store.dispatch(updateCourseAction);

    // assert
    currentCourse = store.getState().courses[0];
    expect(currentCourse).toEqual(updatedCourse);

  });
});