import React from 'react';
import TutorUpcomingEvent from './TutorUpcomingEvent.jsx';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';

class UpcomingEvents extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    console.log("!!!!!!", this.props.user.availability);
    let todayDate = new Date();
    let today = todayDate.getDay();
    let todayHours = todayDate.getHours() + ":" + todayDate.getMinutes();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = days[today];
    let count = 0;
    let day = today;
    let renEvents = [];
    let events = [];
    if (this.props.user.availability) {
        while (count < 3) {
            console.log(dayName, this.props.availability);
            events = this.props.user.availability[dayName];
            for (event in events) {
                if (!((day == today) && (todayHours > events[event].end_time))) {
                    renEvents.push(<TutorUpcomingEvent dayName={dayName} today={dayName == days[today] ? true : false} startTime={events[event].start_time} endTime={events[event].end_time}/>);
                    count++;
                }
            }
            day = (day + 1)%7;
            dayName = days[day];
        }
    }

    return (
    <div className="text-center">
        <h2 className="lighter-text text-uppercase tutor-events-header">Upcoming Sessions</h2>
        {renEvents}
        <div className="google-calendar">

        </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log(state);
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(updateUser(user))
    }
};

const TutorUpcomingEvents = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpcomingEvents);

export default TutorUpcomingEvents;