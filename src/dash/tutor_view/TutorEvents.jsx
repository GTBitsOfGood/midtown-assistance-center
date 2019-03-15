/**
 * @file
 * TutorEvents.jsx
 *
 * @fileoverview
 * Show the current event and the
 * upcoming events for a tutor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TutorUpcomingEvent from './TutorUpcomingEvent';
import TutorUpcomingEvents from './TutorUpcomingEvents';
import axios from 'axios';
import TutorCurrentEvent from './TutorCurrentEvent';

// Maximum number of upcoming events to display at once
const MAX_NUM_OF_EVENTS = 5;

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

class Events extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.initEvents = this.initEvents.bind(this);
        this.state = {
            currentEvent: null,
            events: null,
            dayName: 'Sunday',
            showModal: false
        };
        this.setCurrentSession = this.setCurrentSession.bind(this);
        this.setParentSession = this.setParentSession.bind(this);
    }

    componentDidMount() {
        this.initEvents(false);
    }

    setParentSession(startTime, endTime) {
        if (!this.state.currentEvent) {
            let now = new Date();
            let start = new Date();
            let end = new Date();
            let startTimeSplit = startTime.split(':');
            let endTimeSplit = endTime.split(':');
            start.setHours(
                parseInt(startTimeSplit[0]),
                parseInt(startTimeSplit[1]),
                0,
                0,
                0
            );
            end.setHours(
                parseInt(endTimeSplit[0]),
                parseInt(endTimeSplit[1]),
                0,
                0,
                0
            );

            let sessionRequestBody = {
                _id: {
                    tutor_id: this.props.user._id,
                    expected_start_time: start
                },
                start_time: now,
                expected_end_time: end
            };
            let requestBody = {
                sessionRequestBody: sessionRequestBody,
                tutorId: this.props.user._id,
                calId: this.props.user.calendarId,
                startTime: startTime,
                endTime: endTime,
                email: this.props.user.gmail
            };

            let self = this;
            axios
                .post('/calendar/createEvent', requestBody)
                .then((response) => {
                    if (response.data.success) {
                        self.initEvents(true, response.data.session);
                        self.props.socket.emit('tutor-update-session');
                        //window.open(response.data.link, '_blank');
                    } else {
                        console.error(response.data.error);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            window.alert('Must close open session before opening a new one');
        }
    }

    setCurrentSession(duration, student_request) {
        let now = new Date();
        let end = new Date();
        let endMinutes = end.getMinutes() < 10 ? '0' + end.getMinutes().toString() : end.getMinutes();
        let nowMinutes = now.getMinutes() < 10 ? '0' + now.getMinutes().toString() : now.getMinutes();
        now.setSeconds(0, 0, 0);
        end.setHours(
            now.getHours() + parseInt(duration)
        );
        end.setSeconds(0, 0, 0);

        const sessionRequestBody = {
            _id: {
                tutor_id: this.props.user._id,
                expected_start_time: now
            },
            start_time: now,
            expected_end_time: end,
            join_requests: student_request ? [
                {
                    student_id:student_request._id.student_id,
                    student_comment:student_request.student_comment,
                    create_time: student_request.create_time,
                    topic: student_request.topic,
                    status: 'approved'
                }
            ] : []
        };
        const requestBody = {
            sessionRequestBody: sessionRequestBody,
            tutorId: this.props.user._id,
            calId: this.props.user.calendarId,
            startTime: now.getHours() + ':' + nowMinutes,
            endTime: end.getHours() + ':' + endMinutes,
            email: this.props.user.gmail
        };

        const self = this;
        axios
            .post('/calendar/createEvent', requestBody)
            .then((response) => {
                if (response.data.success) {
                    self.initEvents(true, response.data.session);
                    self.props.socket.emit('tutor-update-session');
                } else {
                    console.error(response.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // Gets the user's current/upcoming events (if any) and adds them to the state
    initEvents(showModal, session) {
        const {user} = this.props;
        const requestBody = {
            username: user._id
        };

        let currentEvent = null;
        const checkOpenSession = !session ? new Promise((resolve, reject) => {
            axios
                .post('/api/checkActiveSession', requestBody)
                .then((response) => {
                    if (response.error) {
                        console.error(response.error);
                    } else if (response.data.has_open_session) {
                        resolve(response.data.session);
                    } else {
                        resolve(null);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }) : new Promise((resolve, reject) => {
            resolve(session);
        });

        checkOpenSession.then((data) => {
            currentEvent = data;
            const upcomingEvents = [];

            const todayDate = new Date();
            const todayIndex = todayDate.getDay();
            let dayName = days[todayIndex];
            let dayIndex = todayIndex;

            // if the current event exists, get the time it starts at
            // TODO: Is there a reason we're checking the time instead of just
            // checking if upcomingEvent == currentEvent?
            const startTime = currentEvent ? new Date(currentEvent._id.expected_start_time) : null;
            let startTimeHours;
            let startTimeMinutes;
            if (startTime) {
                startTimeHours = startTime.getHours();
                startTimeMinutes = startTime.getMinutes() < 10 ? '0' + startTime.getMinutes().toString() : startTime.getMinutes();
            }

            // add all upcoming events that aren't the current event (up to MAX_NUM_OF_EVENTS)
            const DAYS_IN_WEEK = 7;
            for (let i = 0; i < DAYS_IN_WEEK; i++) {
                let events = user.availability[dayName];
                for (let event in events) {
                    const isCurrentEvent = events[event].start_time === startTimeHours + ':' + startTimeMinutes;
                    if (!startTime || !isCurrentEvent) {
                        if (upcomingEvents.length < MAX_NUM_OF_EVENTS) {
                            upcomingEvents.push({
                                start_time: events[event].start_time,
                                end_time: events[event].end_time,
                                active: dayName === days[todayIndex],
                                dayName
                            });
                        }
                    }
                }
                dayIndex = (dayIndex + 1) % 7;
                dayName = days[dayIndex];
            }
            this.setState({
                currentEvent,
                events:upcomingEvents,
                dayName,
                showModal
            });
        }, (err) => {
            console.error(err);
        });


    }

    /**
     * Iterate through the times in the tutor's availability.
     * Create a TutorCurrentEvent for the current event (if any)
     * and a TutorUpcomingEvents for the upcoming events
     * @returns {*}
     */
    render() {
        const endTimeMinutes = this.state.currentEvent ? (new Date(this.state.currentEvent.expected_end_time).getMinutes() < 10 ? '0' + new Date(this.state.currentEvent.expected_end_time).getMinutes().toString() : new Date(this.state.currentEvent.expected_end_time).getMinutes()) : null;
        const startTimeMinutes = this.state.currentEvent ? (new Date(this.state.currentEvent._id.expected_start_time).getMinutes() < 10 ? '0' + new Date(this.state.currentEvent._id.expected_start_time).getMinutes() : new Date(this.state.currentEvent._id.expected_start_time).getMinutes()) : null;
        return (
            <div>
                <TutorCurrentEvent
                    socket={this.props.socket}
                    currentEvent={this.state.currentEvent}
                    startTime={this.state.currentEvent ? new Date(this.state.currentEvent._id.expected_start_time).getHours() + ":" + startTimeMinutes : "00:00"}
                    endTime={this.state.currentEvent ? new Date(this.state.currentEvent.expected_end_time).getHours() + ":" + endTimeMinutes : "00:00"}
                    dayName={this.state.dayName ? this.state.dayName : "Sunday"}
                    setCurrentSession={this.setCurrentSession}
                    type='currentEvent'
                    showModal={this.state.showModal}
                />
                <TutorUpcomingEvents
                    socket={this.props.socket}
                    events={this.state.events}
                    setParentSession={this.setParentSession}
                    type='upcomingEvent'
                    showModal={false}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user:state.user
});

const TutorEvents = connect(
    mapStateToProps,
    null
)(Events);

export default TutorEvents;