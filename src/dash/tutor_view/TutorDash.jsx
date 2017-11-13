import React from 'react';
import { connect } from 'react-redux';

class TutorDash extends React.Component {

  render() {
    return (
      <div>
        <h1> Hello Tutor </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Since we never use the redux state here
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const TutorDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorDash);

export default TutorDashboard;