import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  const props = {
    course: { authorId: 'Cory House' },
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('CourseForm via React Test Utils', () => {
  it('should render form and h1', () => {
    const { output } = setup();
    expect(output.type).toBe('form');
    const [ h1 ] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('should label the save button to "Save" when not saving', () => {
    const { output } = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('should label the save button to "Saving..." when saving', () => {
    const { output } = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });
});