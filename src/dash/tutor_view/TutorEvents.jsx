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

const NUM_OF_EVENTS = 5;

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
            events: null
        };
        this.setCurrentSession = this.setCurrentSession.bind(this);
    }

    componentDidMount() {
        this.initEvents();
    }

    initEvents() {
        const {user} = this.props;
        const requestBody = {
            username: user._id
        };

        let currentEvent = null;
        const checkOpenSession = new Promise((resolve, reject) => {
            axios
                .post('/api/checkActiveSession', requestBody)
                .then(function(response) {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        console.log(response.data);
                        if (response.data.has_open_session) {
                            resolve(response.data.session);
                        } else {
                            resolve(null);
                        }
                    }
                })
                .catch(function(err) {
                    reject(err);
                });
        });

        checkOpenSession.then((data) => {
            currentEvent = data;
            const todayDate = new Date();
            const today = todayDate.getDay();
            let dayName = days[today];
            let day = today;
            const upcomingEvents = [];
            const startTime = currentEvent ? new Date(currentEvent._id.expected_start_time) : null;
            let startTimeHours;
            let startTimeMinutes;
            if (startTime) {
                startTimeHours = startTime.getHours();
                startTimeMinutes = startTime.getMinutes() < 10 ? '0' + startTime.getMinutes().toString() : startTime.getMinutes();
            }
            for (let i = 0; i < NUM_OF_EVENTS; i++) {
                let events = user.availability[dayName];
                for (let event in events) {
                    if (!startTime || !(events[event].start_time === startTimeHours + ':' + startTimeMinutes)) {
                        upcomingEvents.push({
                            start_time: events[event].start_time,
                            end_time: events[event].end_time,
                            active: dayName === days[today],
                            dayName: dayName
                        });
                    }
                }
                day = (day + 1) % 7;
                dayName = days[day];
            }
            this.setState({
                currentEvent,
                events:upcomingEvents,
                dayName
            });
        }, (err) => {
            console.log(err);
        });


    }

    setCurrentSession(duration) {
        let now = new Date();
        let end = new Date();
        end.setHours(
            now.getHours() + parseInt(duration)
        );

        let sessionRequestBody = {
            _id: {
                tutor_id: this.props.tutorId,
                expected_start_time: now
            },
            start_time: now,
            expected_end_time: end
        };
        let requestBody = {
            sessionRequestBody: sessionRequestBody,
            tutorId: this.props.user._id,
            calId: this.props.user.calendarId,
            startTime: now.getHours() + ':' + now.getMinutes(),
            endTime: end.getHours() + ':' + end.getMinutes(),
            email: this.props.user.gmail
        };

        console.log(requestBody);

        let self = this;
        axios
            .post('/calendar/createEvent', requestBody)
            .then(function(response) {
                console.log(response);
                if (response.data.success) {
                    self.setState({
                        currentEvent: response.data.session,
                        dayName: days[now.getDay()]
                    });
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
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
                />
                <TutorUpcomingEvents socket={this.props.socket} events={this.state.events}/>
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