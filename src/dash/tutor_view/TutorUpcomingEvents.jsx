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
        let renEvents = [];
        for (event in this.props.events) {
            renEvents.push(
                <TutorUpcomingEvent
                    key={event}
                    socket={this.props.socket}
                    tutorId={this.props.user._id}
                    calId={this.props.user.calendarId}
                    gmail={this.props.user.gmail}
                    dayName={this.props.events[event].dayName}
                    today={this.props.events[event].active}
                    startTime={this.props.events[event].start_time}
                    endTime={this.props.events[event].end_time}
                />
            );
        }
        // renEvents.sort((a, b) => {
        //     if (a.props.dayName === b.props.dayName) {
        //         return a.props.startTime.localeCompare(b.props.startTime);
        //     }
        //     // TODO: fix this
        //     return 0;
        // });
        // renEvents = renEvents.slice(0, NUM_OF_EVENTS);

        return (
            <div className="row animated fadeInRight tutorUpcomingEvents">
                <div className="col">
                    <div className="text-center row">
                        <h4 className="lighter-text text-uppercase tutor-events-header">
                            Upcoming Sessions
                        </h4>
                        <div className="col-xs-12">{renEvents}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user:state.user
});

const TutorUpcomingEvents = connect(
    mapStateToProps,
    null
)(UpcomingEvents);

export default TutorUpcomingEvents;
