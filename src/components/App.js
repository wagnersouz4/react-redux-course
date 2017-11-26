import React, {PropTypes} from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header isLoading={this.props.isLoading}/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isLoading: state.numAjaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);