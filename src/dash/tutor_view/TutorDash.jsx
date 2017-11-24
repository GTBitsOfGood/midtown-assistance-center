import React from 'react';
import TutorUpcomingEvents from './TutorUpcomingEvents.jsx';
import { connect } from 'react-redux';
import TutorProfile from './Profile.jsx';

const tutor = {
      first_name: 'Sruti',
      last_name: 'Guhathakurta',
      subjects: [{subject:'Math', start_grade:6, end_grade:12},{subject:'Science', start_grade:5, end_grade:7},{subject:'Computers', start_grade:6, end_grade:12}],
      availability: {
          Monday: [{start_time:'14:00', end_time:'15:00'}],
          Tuesday: [{start_time:'18:00', end_time:'19:00'}],
          Wednesday: [{start_time:'17:00', end_time:'18:00'}, {start_time:'13:00', end_time:'14:00'}],
          Thursday: [{start_time:'16:00', end_time:'17:00'}],
          Friday: [],
          Saturday: [],
          Sunday: []
      },
      profile_picture: '/images/default_user_img.png',
      bio: 'Hello, my name is Sruti.',
      email: 'sruti@gatech.edu',
      class_standing: 'Senior',
      rating: 5,
      online:false,
      gender: 'female'
}

class TutorDash extends React.Component {

  render() {
    return (
    <div>
      <div className="col-md-6 text-center">
        <h2 className="lighter-text text-uppercase tutor-events-header">Profile</h2>
        <TutorProfile/>
      </div>
      <div className="col-md-6 upcoming-events-list">
        <TutorUpcomingEvents availability={tutor.availability}/>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Since we never use the redux state here
  console.log(state);
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser : (user) => dispatch(updateUser(user))
  }
};

const TutorDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorDash);

export default TutorDashboard;