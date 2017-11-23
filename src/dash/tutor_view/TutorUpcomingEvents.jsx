import React from 'react';
import TutorUpcomingEvent from './TutorUpcomingEvent.jsx';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';

const NUM_OF_EVENTS = 5;

class UpcomingEvents extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
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
        for (day in this.props.user.availability) {
            events = this.props.user.availability[day];
            if (events) {
                for (event in events) {
                    renEvents.push(<TutorUpcomingEvent dayName={day} today={dayName == day} startTime={events[event].start_time} endTime={events[event].end_time} />);
                }
            }
        }
        // while (count < NUM_OF_EVENTS) {
        //     events = this.props.user.availability[dayName];
        //     console.log("!!!!!!!!!", count, events);
        //     for (event in events) {
        //         if (!((day == today) && (todayHours > events[event].end_time))) {
        //             renEvents.push(<TutorUpcomingEvent dayName={dayName} today={dayName == days[today] ? true : false} startTime={events[event].start_time} endTime={events[event].end_time}/>);
        //             count++;
        //         }
        //     }
        //     day = (day + 1)%7;
        //     dayName = days[day];
        // }
    }
    renEvents.sort(function(a, b) {
        console.log("!@#$!@#$", a.props.dayName);
        if (a.props.dayName === b.props.dayName) {
            return a.props.startTime.localeCompare(b.props.startTime);
        }
        return days.indexOf(a.props.dayName) - days.indexOf(b.props.dayName);
    });
    renEvents = renEvents.slice(0, NUM_OF_EVENTS);

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