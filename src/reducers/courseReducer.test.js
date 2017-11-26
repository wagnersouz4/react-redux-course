import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {

    // arrange
    const initialState = [
      {
        id: 'A',
        title: 'A'
      },
      {
        id: 'B',
        title: 'B'
      }
    ];

    const newCourse = {
      id: 'C',
      title: 'C'
    };
    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);

    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');

    expect(newState).toEqual([...initialState, Object.assign({}, newCourse)]);
  });

  it('should update course when passes UPDATE_COURSE_SUCCESS', () => {

    // arrange
    const initialState = [
      {
        id: 'A',
        title: 'A'
      },
      {
        id: 'B',
        title: 'B'
      },
      {
        id: 'C',
        title: 'C'
      }
    ];

    const course = {
      id: 'B',
      title: 'New Title'
    };
    const action = actions.updateCourseSuccess(course);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(elem => elem.id == course.id);
    const untouchedCourse = newState.find(elem => elem.id == 'A');

    // assert
    expect(updatedCourse.title).toEqual(course.title);
    expect(untouchedCourse.title).toEqual(initialState[0].title);
    expect(newState.length).toEqual(3);

  });
});