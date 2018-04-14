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
import SessionReviewModal from './SessionReviewModal.jsx';


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
            session: {}
        };

        this.handleAccessHangoutLink = this.handleAccessHangoutLink.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.setNewState = this.setNewState.bind(this);
    }

    /**
     * When a student joins the session or requests to join the session,
     * get the updated session from the database
     * @param data
     */
    updateSession() {
        let start = new Date();
        let startTimeSplit = this.props.startTime.split(":");
        start.setHours(parseInt(startTimeSplit[0]), parseInt(startTimeSplit[1]), 0, 0);
        let sessionRequestBody = {
            _id: {
                expected_start_time: start,
                tutor_id: this.props.tutorId,
            }
        };
        let self = this;
        console.log("BOUT TO GET SESSION")
        axios.post('/api/getTutorSession', sessionRequestBody)
            .then(function(response){
                if (response.data.success) {
                    self.setNewState(response.data.link, response.data.id, response.data.session);
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
     * Update the session in the current state
     * @param link
     * @param id
     * @param session
     */
    setNewState(link, id, session) {
        this.setState({
            hangoutsLink: link,
            eventId: id,
            session: session
        });
        this.forceUpdate();
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
        let startTimeSplit = this.props.startTime.split(":");
        start.setHours(parseInt(startTimeSplit[0]), parseInt(startTimeSplit[1]), 0, 0);
        let sessionRequestBody = {
            _id: {
                expected_start_time: start,
                tutor_id: this.props.tutorId,
            },
            rating: rating,
            comment: comment,
            end_time: now
        };
        axios.post('/api/tutorSubmitReview', sessionRequestBody)
            .then(function(response){
                if (response.data.success) {
                    console.log(response.data);
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
        let time = now.getHours() + ":" + now.getMinutes();
        let start = new Date();
        let end = new Date();
        let startTimeSplit = this.props.startTime.split(":");
        let endTimeSplit = this.props.endTime.split(":");
        start.setHours(parseInt(startTimeSplit[0]), parseInt(startTimeSplit[1]), 0, 0);
        end.setHours(parseInt(endTimeSplit[0]), parseInt(endTimeSplit[1]), 0, 0);

        if (this.state.session.hangouts_link && time.localeCompare(this.props.endTime) < 0) {
            window.open(this.state.session.hangouts_link, "_blank");
        } else {
            let sessionRequestBody = {
                _id: {
                    tutor_id: this.props.tutorId,
                    expected_start_time: start,
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
            axios.post('/calendar/createEvent', requestBody)
                .then(function(response){
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
    }

    /**
     * Render the tutor upcoming event component
     * @returns {HTML}
     */
    render() {
        let now = new Date();
        let startTimeHour = parseInt(this.props.startTime.split(':')[0]);
        let endTimeHour = parseInt(this.props.endTime.split(':')[0]);
        let startTime = startTimeHour%12 + ':' + this.props.startTime.split(':')[1] + (startTimeHour >= 12 ? ' PM' : ' AM');
        let endTime = endTimeHour%12 + ':' + this.props.endTime.split(':')[1] + (endTimeHour >= 12 ? ' PM' : ' AM');
        let active = (startTimeHour - now.getHours() <= 1 && this.props.today);
        const renLogo = active ? <a onClick={this.handleAccessHangoutLink} href="#" data-toggle="modal" data-target={"#Modal_" + this.props.dayName + "_" + this.props.startTime.split(':')[0] + "_" + this.props.endTime.split(':')[0]}><img className="google-link" src="/images/google-icon-active.png"></img></a> : <img className="google-link" src="/images/google-icon-disabled.png"></img>;

        this.props.socket.on('session-update-' + this.state.session.eventId, (data) => {
            console.log("Session update!");
            console.log(data);
            this.updateSession();
        });
        return (
            <div className="tutorUpcomingEvent">
                <div className="tutorUpcomingEventContent">
                    <h4 className="upcoming-event-desc">{this.props.today ? 'Today' : this.props.dayName}<span className="upcoming-event-light lighter-text"> from </span>{startTime}<span className="upcoming-event-light lighter-text"> to </span>{endTime}
                    </h4>

                </div>
                <div className="tutorUpcomingEventContent">
                    {renLogo}
                </div>
                <SessionReviewModal updateSession={this.setNewState} onSubmit={this.submitReview} tutorId={this.props.tutorId} id={this.props.dayName + "_" + this.props.startTime.split(':')[0] + "_" + this.props.endTime.split(':')[0]} session={this.state.session}/>
            </div>
        );
    }
}

export default TutorUpcomingEvent;