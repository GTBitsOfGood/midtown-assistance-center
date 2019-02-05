/**
 * @file
 * TutorUpcomingEvent.jsx
 *
 * @fileoverview
 * React component for an upcoming event on the tutor dash.
 * The google hangouts link is active if the event is within
 * the hour.
 */

import React from 'react';
import axios from 'axios';
import moment from 'moment';
import SessionReviewModal from './SessionReviewModal';

class TutorUpcomingEvent extends React.Component {
    /**
     * Set the hangouts link in the state and bind functions
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            session: {},
            display: true,
        };

        this.handleAccessHangoutLink = this.handleAccessHangoutLink.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.initUpcomingEvent = this.initUpcomingEvent.bind(this);
        this.onUnload = this.onUnload.bind(this);
        this.setNewState = this.setNewState.bind(this);
    }

    /**
     * Initialize the display variable before mounting
     */
    componentWillMount() {
        this.initUpcomingEvent();
    }

    /**
     * Add an unload listener to prevent user from closing tab when
     * a session is open
     */
    componentDidMount() {
        // window.addEventListener("beforeunload", this.onUnload);
    }

    /**
     * Remove the listener on unmount so that there isn't a confirmation
     * window each time the user refreshes the page
     */
    componentWillUnmount() {
        // window.removeEventListener("beforeunload", this.onUnload);
    }


    /**
     * Check for an open session on unload
     * TODO: figure out how to get this to work
     * @param e
     * @returns {string}
     */
    onUnload(e) {
        const { session, display } = this.state;
        if (session !== {} && display) {
            e.returnValue = 'oh no open session';
            return 'oh no open session';
        }
    }

    setNewState(session) {
        this.setState({session});
    }

    /**
     * Check if this session has already ended and if it has, set display to none
     * This is buggy af
     */
    initUpcomingEvent() {
        // TODO: do this in the TutorUpcomingEvents component in the for loop instead of here.
        // TODO: this causes a bug where if new times are added, the state of this component does not
        // TODO: change and it hides new times.
        const now = new Date();
        const nowMoment = moment();
        const endTimeHour = parseInt(this.props.endTime.split(':')[0]);
        const active = endTimeHour - now.getHours() <= 0 && this.props.today;
        const startTimeSplit = this.props.startTime.split(':');
        now.setHours(
            parseInt(startTimeSplit[0]),
            parseInt(startTimeSplit[1]),
            0,
            0
        );
        const sessionRequestBody = {
            _id: {
                expected_start_time: now,
                tutor_id: this.props.tutorId
            }
        };
        if (active) {
            const self = this;
            axios
                .post('/api/getTutorSession', sessionRequestBody)
                .then((response) => {
                    if (response.data.success) {
                        const end = moment(response.data.session.expected_end_time);
                        if (
                            ((response.data.session &&
                                    response.data.session.end_time) ||
                                    nowMoment.diff(end) > 0) &&
                                !(self.props.type === 'currentEvent')
                        ) {
                            self.setState({ display: false });
                        } else {
                            self.setState({ display: true });
                            if (response.data.session) {
                                self.setState({
                                    session:response.data.session
                                });
                            }
                        }
                    } else {
                        console.error(response.data.error);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

        } else {
            this.setState({ display: true });
        }
    }

    /**
     * When a student joins the session or requests to join the session,
     * get the updated session from the database
     * @param data
     */
    updateSession() {
        const start = new Date();
        const startTimeSplit = this.props.startTime.split(':');
        start.setHours(
            parseInt(startTimeSplit[0]),
            parseInt(startTimeSplit[1]),
            0,
            0
        );
        const sessionRequestBody = {
            _id: {
                expected_start_time: start,
                tutor_id: this.props.tutorId
            }
        };
        const self = this;
        axios
            .post('/api/getTutorSession', sessionRequestBody)
            .then((response) => {
                if (response.data.success) {
                    self.setState({session:response.data.session});
                    $(
                        `#Modal_${
                            self.props.dayName
                        }_${
                            self.props.startTime.split(':')[0]
                        }_${
                            self.props.endTime.split(':')[0]}`
                    ).modal('show');
                    self.props.socket.emit('tutor-update-session');
                } else {
                    console.error(response.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
     * submit the tutor review, update the rating and comment for the
     * tutor session in the database
     * @param rating
     * @param comment
     */
    submitReview(rating, comment) {
        const now = new Date();
        const start = new Date();
        const startTimeSplit = this.props.startTime.split(':');
        const self = this;
        start.setHours(
            parseInt(startTimeSplit[0]),
            parseInt(startTimeSplit[1]),
            0,
            0,
            0
        );
        const sessionRequestBody = {
            _id: {
                expected_start_time: start,
                tutor_id: this.props.tutorId
            },
            rating,
            comment,
            end_time: now
        };
        axios
            .post('/api/tutorSubmitReview', sessionRequestBody)
            .then((response) => {
                if (response.data.success) {
                    self.props.socket.emit('tutor-update-session');
                    window.location.reload();
                } else {
                    console.error(response.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
     * when the tutor requests access to the hangouts link,
     * send a request to the createEvent function with the start time
     * and end time of the session and either get the already created
     * link or create a new one.
     */
    handleAccessHangoutLink() {
        if (this.state.session) {
            window.open(this.state.session.hangouts_link, '_blank');
        } else {
            this.props.setParentSession(this.props.startTime, this.props.endTime);
        }

    }

    /**
     * Render the tutor upcoming event component. If the socket gets a session-update signal,
     * retrieve the new session from the database and set the state again. This happens when
     * a student either requests to join the session, or joins the session.
     * @returns {HTML}
     */
    render() {
        $(() => {
            $('[data-toggle="tooltip"]').tooltip();
        });
        const now = new Date();
        const startTimeHour = parseInt(this.props.startTime.split(':')[0]);
        const endTimeHour = parseInt(this.props.endTime.split(':')[0]);
        const startTime =
            `${startTimeHour % 12
            }:${
                this.props.startTime.split(':')[1]
            }${startTimeHour >= 12 ? ' PM' : ' AM'}`;
        const endTime =
            `${endTimeHour % 12
            }:${
                this.props.endTime.split(':')[1]
            }${endTimeHour >= 12 ? ' PM' : ' AM'}`;
        const active = startTimeHour - now.getHours() <= 1 && this.props.today;
        const renLogo = active ? (
            <a
                onClick={this.props.type === 'currentEvent' ? this.handleAccessHangoutLink : () => this.props.setParentSession(this.props.startTime, this.props.endTime)}
                href="#"
                data-toggle={this.props.type === 'currentEvent' ? 'modal' : ''}
                data-target={this.props.type === 'currentEvent' ? (
                    `#Modal_${
                        this.props.dayName
                    }_${
                        this.props.startTime.split(':')[0]
                    }_${
                        this.props.endTime.split(':')[0]}`) : ''
                }
            >
                <div className="session-info-container" data-toggle="tooltip" title="Click to enter session">
                    <h4 className="session-info session-info-active">Enter Session</h4>
                    <img
                        className=" google-link"
                        src="/images/google-icon-active.png"
                    />
                </div>
            </a>
        ) : (
            <div className="session-info-container" data-toggle="tooltip" title="Can not enter inactive session">
                <h4 className="session-info session-info-inactive">Session Inactive</h4>
                <img
                    className=" google-link"
                    src="/images/google-icon-disabled.png"
                />
            </div>
        );

        this.props.socket.on(
            `session-update-${  this.state.session.eventId}`,
            data => {
                this.updateSession();
            }
        );

        const upcomingEvent = (
            <div className="tutorUpcomingEvent">
                <div className="tutorUpcomingEventContent">
                    <h4 className="upcoming-event-desc">
                        {this.props.today ? 'Today' : this.props.dayName}
                        <span className="upcoming-event-light lighter-text">
                            {' '}
                            from{' '}
                        </span>
                        {startTime}
                        <span className="upcoming-event-light lighter-text">
                            {' '}
                            to{' '}
                        </span>
                        {endTime}
                    </h4>
                </div>
                <div className="tutorUpcomingEventContent">{renLogo}</div>
                <SessionReviewModal
                    socket={this.props.socket}
                    updateSession={this.setNewState}
                    onSubmit={this.submitReview}
                    tutorId={this.props.tutorId}
                    showModal={this.props.showModal}
                    id={
                        `${this.props.dayName
                        }_${
                            this.props.startTime.split(':')[0]
                        }_${
                            this.props.endTime.split(':')[0]}`
                    }
                    session={this.state.session}
                />
            </div>
        );
        return <div>{this.state.display ? upcomingEvent : ''}</div>;
    }
}

export default TutorUpcomingEvent;
