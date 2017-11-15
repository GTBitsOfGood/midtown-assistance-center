import React from 'react';
import { connect } from 'react-redux';

class TutorDash extends React.Component {

  render() {
    return (
    <div>
      <div className="col-md-6">
        <h2>Profile</h2>
      </div>
      <div className="col-md-6">
        <h2>Calendar</h2>
      </div>
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