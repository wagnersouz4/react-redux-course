import expect from 'expect';
import React from 'react';
import { mount, shallow } from "enzyme";
import { ManageCoursePage } from './ManageCoursePage';

// Testing a container component
describe('Manage Course Page', () => {
  it ('should set an error message when trying to save a course with an empty title', () => {
    // const wrappedComponent = <Provider store={store}><ManageCoursePage/></Provider> // Useful to test redux connected related code such as mapStateToProps
    const props = {
      authors: [],
      actions: {
        saveCourse: () => Promise.resolve()
      },
      course: {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
      }
    };

    const wrapper = mount(<ManageCoursePage {...props}/>); // we need to pass the option authors (being expected int he SelectInput) as we are not using the connected redux which was taking care of this.
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});