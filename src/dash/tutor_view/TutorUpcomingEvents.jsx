import React from 'react';
import TutorUpcomingEvent from './TutorUpcomingEvent.jsx';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';

const NUM_OF_EVENTS = 3;

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
    let totalCount = 0;
    let renEvents = [];
    let events = [];
    if (this.props.user.availability) {
        while (count < NUM_OF_EVENTS && totalCount < 7) {
            events = this.props.user.availability[dayName];
            console.log("!!!!!!!!!", count, events);
            for (event in events) {
                if (!((day == today) && (todayHours > events[event].end_time))) {
                   renEvents.push(<TutorUpcomingEvent dayName={dayName} today={dayName == days[today] ? true : false} startTime={events[event].start_time} endTime={events[event].end_time}/>);
                     count++;
                 }
             }
             day = (day + 1)%7;
             dayName = days[day];
             totalCount++;
        }
    }
    // sort by day of the week then start time
    renEvents.sort(function(a, b) {
        if (a.props.dayName === b.props.dayName) {
            return a.props.startTime.localeCompare(b.props.startTime);
        }
        return days.indexOf(a.props.dayName) - days.indexOf(b.props.dayName);
    });
    renEvents = renEvents.slice(0, NUM_OF_EVENTS);

    let stars = [];
    let halfStars = (this.props.user.rating - Math.floor(this.props.user.rating))/0.5;
    let emptyStars = (5 - Math.ceil(this.props.user.rating));
    let fullStars = Math.floor(this.props.user.rating);

    for (let x = 0; x < fullStars; x++) {
        stars.push(<span><img className="star" src='/images/full-star.png' width="25" height="25"></img></span>);
    }
    for (let y = 0; y < halfStars; y++) {
        stars.push(<span><img className="star" src='/images/half-star.png' width="25" height="25"></img></span>);
    }
    for (let z = 0; z < emptyStars; z++) {
        stars.push(<span><img className="star" src='/images/empty-star.png' width="25" height="25"></img></span>);
    }

    return (
    <div className="row">
        <div className="col">
            <div className="text-center row">
                <h2 className="lighter-text text-uppercase tutor-events-header">Upcoming Sessions</h2>
                {renEvents}
            </div>
            <h2 className="lighter-text text-uppercase tutor-events-header text-center">Statistics</h2>
            <div className="statistics row">
                <div className="col">
                    Rating: { stars }
                </div>
                <div className="col">
                    Number of ratings: { this.props.user.num_ratings }
                </div>

            </div>
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