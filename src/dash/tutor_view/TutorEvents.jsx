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
            let day = today;
            const upcomingEvents = [];
            const startTime = currentEvent ? new Date(currentEvent._id.expected_start_time) : null;
            for (let i = 0; i < NUM_OF_EVENTS; i++) {
                let events = user.availability[dayName];
                for (let event in events) {
                    if (!startTime || !(events[event].start_time === startTime.getHours() + ':' + startTime.getMinutes())) {
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

    /**
     * Iterate through the times in the tutor's availability.
     * Create a TutorCurrentEvent for the current event (if any)
     * and a TutorUpcomingEvents for the upcoming events
     * @returns {*}
     */
    render() {
        return (
            <div>
                <TutorCurrentEvent
                    socket={this.props.socket}
                    currentEvent={this.state.currentEvent}
                    startTime={this.state.currentEvent ? new Date(this.state.currentEvent._id.expected_start_time).getHours() + ":" + new Date(this.state.currentEvent._id.expected_start_time).getMinutes() : "00:00"}
                    endTime={this.state.currentEvent ? new Date(this.state.currentEvent.expected_end_time).getHours() + ":" + new Date(this.state.currentEvent.expected_end_time).getMinutes() : "00:00"}
                    dayName={this.state.dayName ? this.state.dayName : "Sunday"}
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