import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toaster from 'toastr';
import { authorSelector } from '../../selectors/course';

// Exporting the class as will be much easy to test it late on.
export class ManageCoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.props = nextProps;
      this.setState({
        course: Object.assign({}, this.props.course)
      });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course });
  }

  courseFormIsValid() {
    const isValidTitle = this.state.course.title.length >= 5;

    const [formIsValid, errors] = (isValidTitle)
      ? [true, {}]
      : [false, { title: 'Title must be at least 5 characters.' }];

    this.setState({ errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) { return; }

    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toaster.error(error);
        this.setState({ saving:false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toaster.success('Course Saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        allAuthors={this.props.authors}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};


function getCourseById(courses, id) {
  const course = courses.find(course => course.id == id);
  if (course.length) { return course; }
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path `/course/:id`

  const newCourse = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  const course = (courseId && state.courses.length) 
   ? getCourseById(state.courses, courseId) // byId as in the routes we have /course/:id
   : newCourse;

  return {
    course,
    authors: authorSelector(state.authors)
  };
}

function matDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, matDispatchToProps)(ManageCoursePage);