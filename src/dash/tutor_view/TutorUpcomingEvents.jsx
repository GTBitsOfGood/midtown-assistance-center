/**
 * @file
 * TutorUpcomingEvents.jsx
 *
 * @fileoverview
 * Iterate through the list of
 * upcoming events for the tutor and create
 * TutorUpcomingEvent components for each of them.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TutorUpcomingEvent from './TutorUpcomingEvent';

const NUM_OF_EVENTS = 5;

class UpcomingEvents extends React.Component {
    /**
     * Iterate through the times in the tutor's availability.
     * Create TutorUpcomingEvent components for each time, and display
     * NUM_OF_EVENTS number of events on the dashboard.
     * @returns {*}
     */
    render() {
        const { user } = this.props;
        const todayDate = new Date();
        const today = todayDate.getDay();
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let dayName = days[today];
        let count = 0;
        let day = today;
        let totalCount = 0;
        let renEvents = [];
        let events = [];
        if (user && user.availability) {
            let keyId = 0;
            while (count < NUM_OF_EVENTS && totalCount < 7) {
                events = user.availability[dayName];
                for (const event in events) {
                    // NOTE: I am no longer checking if the event's end time is less than the current end time
                    // because if the tutor has ended the session, it shouldn't display it
                    // TODO: It would be better to add the 'session already ended' check here instead of in the
                    // TODO: TutorUpcomingEvent component
                    // if (!(day === today && todayHours > events[event].end_time)) {
                    renEvents.push(
                        <TutorUpcomingEvent
                            key={keyId++}
                            socket={this.props.socket}
                            tutorId={this.props.user._id}
                            calId={this.props.user.calendarId}
                            gmail={this.props.user.gmail}
                            dayName={dayName}
                            today={dayName === days[today]}
                            startTime={events[event].start_time}
                            endTime={events[event].end_time}
                        />
                    );
                    count++;
                    // }
                }
                day = (day + 1) % 7;
                dayName = days[day];
                totalCount++;
            }
        }
        // sort by day of the week then start time
        renEvents.sort((a, b) => {
            if (a.props.dayName === b.props.dayName) {
                return a.props.startTime.localeCompare(b.props.startTime);
            }
            // TODO: fix this
            return 0;
        });
        renEvents = renEvents.slice(0, NUM_OF_EVENTS);

        return (
            <div className="row animated fadeInRight tutorUpcomingEvents">
                <div className="col">
                    <div className="text-center row">
                        <div className="row list-inline ">
                            <h4 className="lighter-text text-uppercase tutor-events-header">
                                Upcoming Sessions
                            </h4>
                            <span
                                className="glyphicon glyphicon glyphicon-info-sign"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="Your upcoming sessions are shown below.
                                        Active sessions are shown in yellow."
                            />
                        </div>
                        <div className="col-xs-12">{renEvents}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const TutorUpcomingEvents = connect(
    mapStateToProps,
    null
)(UpcomingEvents);

export default TutorUpcomingEvents;
