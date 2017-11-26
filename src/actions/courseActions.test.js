import * as types from './actionTypes';
import * as courseActions from './courseActions';
import expect from 'expect';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {

      // arrange
      const course = {
        id: 'clean-code',
        title: 'Clean Code'
      };

      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course
      };

      // act
      const action = courseActions.createCourseSuccess(course);

      // assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => nock.cleanAll()); // perform a cleanup before each test
  it('should create BEGIN_AJAX_CALL and LOAD_COURSE_SUCCESS when loading courses', (done) => {
    /**
     * Nock Example
     * nock('http://example.com') ==> Nock will capture the real url call and instead of calling it will just fake the response
     *  .get('/courses')
     *  .reply(200, { body: { courses: [ { id: 1, firstName: 'Cory', lastName: 'House' } ] }})
     */

     const expectedCourse = {
       id: 'clean-code',
       title: 'Clean Code'
     };

     const expectedActions = [
       { type: types.BEGIN_AJAX_CALL },
       { type: types.LOAD_COURSES_SUCCESS, body: { courses: [expectedCourse]} }
      ];

      // setting a initial state and expected actions
      const store = mockStore({ courses: [] }, expectedActions);

      store.dispatch(courseActions.loadCourses()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
        done();
      });
  });
});
