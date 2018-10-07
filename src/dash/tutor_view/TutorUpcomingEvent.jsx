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
import SessionReviewModal from './SessionReviewModal';

class TutorUpcomingEvent extends React.Component {
    /**
     * Set the hangouts link in the state and bind functions
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            hangoutsLink: '',
            hangoutsLinkExpires: '',
            eventId: '',
            session: {},
            display: true
        };

        this.handleAccessHangoutLink = this.handleAccessHangoutLink.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.setNewState = this.setNewState.bind(this);
        this.initUpcomingEvent = this.initUpcomingEvent.bind(this);
        this.onUnload = this.onUnload.bind(this);
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

    /**
     * Update the session in the current state
     * @param link
     * @param id
     * @param session
     */
    setNewState(link, id, session) {
        // TODO: There is no reason to store hangoutsLink and eventId in the state
        // TODO: since they are part of the session object itself.
        this.setState({
            hangoutsLink: link,
            eventId: id,
            session: session
        });
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
        const startTimeHour = parseInt(this.props.startTime.split(':')[0]);
        let active = startTimeHour - now.getHours() <= 1 && this.props.today;
        let startTimeSplit = this.props.startTime.split(':');
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
            let self = this;
            axios
                .post('/api/getTutorSession', sessionRequestBody)
                .then(function(response) {
                    if (response.data.success) {
                        if (
                            response.data.session &&
                            response.data.session.end_time
                        ) {
                            self.setState({ display: false });
                        } else {
                            self.setState({ display: true });
                            if (response.data.session) {
                                self.setNewState(
                                    response.data.session.hangouts_link,
                                    response.data.session.eventId,
                                    response.data.session
                                );
                            }
                        }
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(function(err) {
                    console.log(err);
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
        let start = new Date();
        let startTimeSplit = this.props.startTime.split(':');
        start.setHours(
            parseInt(startTimeSplit[0]),
            parseInt(startTimeSplit[1]),
            0,
            0
        );
        let sessionRequestBody = {
            _id: {
                expected_start_time: start,
                tutor_id: this.props.tutorId
            }
        };
        let self = this;
        axios
            .post('/api/getTutorSession', sessionRequestBody)
            .then(function(response) {
                if (response.data.success) {
                    self.setNewState(
                        response.data.link,
                        response.data.id,
                        response.data.session
                    );
                    $(
                        '#Modal_' +
                            self.props.dayName +
                            '_' +
                            self.props.startTime.split(':')[0] +
                            '_' +
                            self.props.endTime.split(':')[0]
                    ).modal('show');
                    console.log('showing modal...');
                    console.log(response.data.session);
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    /**
     * submit the tutor review, update the rating and comment for the
     * tutor session in the database
     * @param rating
     * @param comment
     */
    submitReview(rating, comment) {
        let now = new Date();
        let start = new Date();
        let startTimeSplit = this.props.startTime.split(':');
        start.setHours(
            parseInt(startTimeSplit[0]),
            parseInt(startTimeSplit[1]),
            0,
            0
        );
        let sessionRequestBody = {
            _id: {
                expected_start_time: start,
                tutor_id: this.props.tutorId
            },
            rating: rating,
            comment: comment,
            end_time: now
        };
        axios
            .post('/api/tutorSubmitReview', sessionRequestBody)
            .then(function(response) {
                if (response.data.success) {
                    console.log(response.data);
                    window.location.reload();
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    /**
     * when the tutor requests access to the hangouts link,
     * send a request to the createEvent function with the start time
     * and end time of the session and either get the already created
     * link or create a new one.
     */
    handleAccessHangoutLink() {
        let now = new Date();
        let time = now.getHours() + ':' + now.getMinutes();
        let start = new Date();
        let end = new Date();
        let startTimeSplit = this.props.startTime.split(':');
        let endTimeSplit = this.props.endTime.split(':');
        start.setHours(
            parseInt(startTimeSplit[0]),
            parseInt(startTimeSplit[1]),
            0,
            0
        );
        end.setHours(
            parseInt(endTimeSplit[0]),
            parseInt(endTimeSplit[1]),
            0,
            0
        );

        let sessionRequestBody = {
            _id: {
                tutor_id: this.props.tutorId,
                expected_start_time: start
            },
            start_time: now,
            expected_end_time: end
        };
        let requestBody = {
            sessionRequestBody: sessionRequestBody,
            tutorId: this.props.tutorId,
            calId: this.props.calId,
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            email: this.props.gmail
        };

        let self = this;
        axios
            .post('/calendar/createEvent', requestBody)
            .then(function(response) {
                if (response.data.success) {
                    self.setState({
                        hangoutsLink: response.data.link,
                        eventId: response.data.id,
                        session: response.data.session
                    });
                    window.open(response.data.link, '_blank');
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    /**
     * Render the tutor upcoming event component. If the socket gets a session-update signal,
     * retrieve the new session from the database and set the state again. This happens when
     * a student either requests to join the session, or joins the session.
     * @returns {HTML}
     */
    render() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        let now = new Date();
        let startTimeHour = parseInt(this.props.startTime.split(':')[0]);
        let endTimeHour = parseInt(this.props.endTime.split(':')[0]);
        let startTime =
            startTimeHour % 12 +
            ':' +
            this.props.startTime.split(':')[1] +
            (startTimeHour >= 12 ? ' PM' : ' AM');
        let endTime =
            endTimeHour % 12 +
            ':' +
            this.props.endTime.split(':')[1] +
            (endTimeHour >= 12 ? ' PM' : ' AM');
        let active = startTimeHour - now.getHours() <= 1 && this.props.today;
        const renLogo = active ? (
            <a
                onClick={this.handleAccessHangoutLink}
                href="#"
                data-toggle="modal"
                data-target={
                    '#Modal_' +
                    this.props.dayName +
                    '_' +
                    this.props.startTime.split(':')[0] +
                    '_' +
                    this.props.endTime.split(':')[0]
                }
            >
                <div data-toggle="tooltip" title="Click to begin session">
                    <img
                        className=" google-link"
                        src="/images/google-icon-active.png"
                    />
                </div>
            </a>
        ) : (
          <div data-toggle="tooltip" title="Can not start inactive session">
          <img
                className=" google-link"
                src="/images/google-icon-disabled.png"
            />
          </div>

        );

        this.props.socket.on(
            'session-update-' + this.state.session.eventId,
            data => {
                console.log('Session update!');
                console.log(data);
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
                    id={
                        this.props.dayName +
                        '_' +
                        this.props.startTime.split(':')[0] +
                        '_' +
                        this.props.endTime.split(':')[0]
                    }
                    session={this.state.session}
                />
            </div>
        );
        return <div>{this.state.display ? upcomingEvent : ''}</div>;
    }
}

export default TutorUpcomingEvent;
