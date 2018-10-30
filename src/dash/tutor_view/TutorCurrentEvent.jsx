/**
 * @file
 * TutorCurrentEvent.jsx
 *
 * @fileoverview
 * React component for the current event
 * for a tutor
 */

import React from 'react';
import axios from 'axios';
import SessionReviewModal from './SessionReviewModal';
import TutorUpcomingEvent from './TutorUpcomingEvent';
import { connect } from 'react-redux';

class CurrentEvent extends React.Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
    }


    /**
     *
     */
    render() {
        console.log("CURRENT EVENT");
        console.log(this.props.currentEvent);
        const renEvent = this.props.currentEvent ?
            <TutorUpcomingEvent
                key={0}
                socket={this.props.socket}
                tutorId={this.props.user._id}
                calId={this.props.user.calendarId}
                gmail={this.props.user.gmail}
                dayName={this.props.dayName}
                today={true}
                startTime={this.props.startTime || "0:00"}
                endTime={this.props.endTime || "0:00"}
            /> :
            <div className="text-center">
                <h4 className="">No current sessions. <a href="#">Start a new session?</a></h4>
            </div>
        return (
            <div className="row animated fadeInRight tutorCurrentEvent">
                <div className="col">
                    <div className="text-center row">
                        <h4 className="lighter-text text-uppercase tutor-events-header">
                            Current Session
                        </h4>
                    </div>
                    <div className="col-xs-12">
                        {renEvent}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user:state.user
});

const TutorCurrentEvent = connect(
    mapStateToProps,
    null
)(CurrentEvent);

export default TutorCurrentEvent;