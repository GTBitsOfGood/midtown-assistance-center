import React from 'react';
import TutorUpcomingEvent from './TutorUpcomingEvent.jsx';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';
import Statistics from './Statistics.jsx';

const NUM_OF_EVENTS = 5;

class UpcomingEvents extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let todayDate = new Date();
        let today = todayDate.getDay();
        let todayHours = todayDate.getHours() + ':' + todayDate.getMinutes();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayName = days[today];
        let count = 0;
        let day = today;
        let totalCount = 0;
        let renEvents = [];
        let events = [];
        // TODO: get past sessions (store in redux) in dash component and check here if the session is one that just ended
        // by checking the start time and today's date along with tutor id (primary key)
        if (this.props.user.availability) {
            while (count < NUM_OF_EVENTS && totalCount < 7) {
                events = this.props.user.availability[dayName];
                for (event in events) {
                    if (!((day === today) && (todayHours > events[event].end_time))) {
                        renEvents.push(<TutorUpcomingEvent tutorId={this.props.user._id} calId={this.props.user.calendarId} gmail={this.props.user.gmail} dayName={dayName} today={ dayName === days[today] } startTime={events[event].start_time} endTime={events[event].end_time}/>);
                        count++;
                    }
                }
                day = (day + 1) % 7;
                dayName = days[day];
                totalCount++;
            }
        }
        // sort by day of the week then start time
        renEvents.sort(function(a, b) {
            if (a.props.dayName === b.props.dayName) {
                return a.props.startTime.localeCompare(b.props.startTime);
            }
        });
        renEvents = renEvents.slice(0, NUM_OF_EVENTS);

        return (
            <div className="row animated fadeInRight">
                <div className="col">
                    <div className="text-center row">
                        <h4 className="lighter-text text-uppercase tutor-events-header">Upcoming Sessions</h4>
                        <div className="col-xs-12">
                            {renEvents}
                        </div>
                    </div>
                    <Statistics/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(updateUser(user))
    };
};

const TutorUpcomingEvents = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpcomingEvents);

export default TutorUpcomingEvents;