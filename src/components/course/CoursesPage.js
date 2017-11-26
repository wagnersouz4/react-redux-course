import React, { PropTypes } from 'react';
import { connect } from 'react-redux'; // The connect is a way to create components that will interact with redux
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  courseRow(course, index) {
    return <div key={index}> {course.title} </div>;
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input 
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired, ==> Dispatch will not be automatically inject and using mapDispatchToProps
  courses: PropTypes.array.isRequired,
  // createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired
};

// mapStateToProps return the props we want to access in our component
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}


function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(courseActions, dispatch)
  };
}

/**
 * An alternative setup to the usage of high order function could be:
 * const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
 * export default connectedStateAndProps(CoursesPage);
 */
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
/**
 * The names mapStateToProps, mapDispatchToProps are a convention which is available in the documentation.
 * However, we could have used a different name or even a inline declaration.
 */