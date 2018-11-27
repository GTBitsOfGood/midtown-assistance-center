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
        const renEvents = [];
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
                    setParentSession={this.props.setParentSession}
                />
            );
        }
        if (this.props.events && this.props.events.length === 0) {
            renEvents.push(
                <h3>You haven't added any session times to your schedule</h3>
            );
        }

        renEvents.sort((a, b) => {
            if (a.props.dayName === b.props.dayName) {
                return a.props.startTime.localeCompare(b.props.startTime);
            }
            // TODO: fix this
            return 0;
        });
        // renEvents.sort((a, b) => {
        //     if (a.props.dayName === b.props.dayName) {
        //         return a.props.startTime.localeCompare(b.props.startTime);
        //     }
        //     // TODO: fix this
        //     return 0;
        // });
        // renEvents = renEvents.slice(0, NUM_OF_EVENTS);

        return (
            <div className="row animated fadeInLeft tutorUpcomingEvents">
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
