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
import { connect } from 'react-redux';
import SessionReviewModal from './SessionReviewModal';
import TutorUpcomingEvent from './TutorUpcomingEvent';
import TutorSessionRequest from './TutorSessionRequest';

class CurrentEvent extends React.Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            pendingRequests: []
        };
        this.setSessionDuration = this.setSessionDuration.bind(this);
        this.getPendingSessionRequests = this.getPendingSessionRequests.bind(this);
    }

    componentWillMount() {
        this.getPendingSessionRequests();
    }

    setSessionDuration(sessionRequest) {
        const sessionDuration = window.prompt('Please enter how many hours between 1 and 4 you would like this session to be');
        if (sessionDuration) {
            if (isNaN(sessionDuration)) {
                window.alert('Please enter a number from 1-4');
            } else if (sessionDuration > 4 || sessionDuration <= 0) {
                window.alert('Error: Invalid number. Hours must be between 1 and 4');
            } else {
                this.props.setCurrentSession(sessionDuration, sessionRequest);
                // TODO: FIX THIS
                // async function- doesn't reset props by the time
                // this is called
                // $('#Modal_' +
                // this.props.dayName +
                // '_' +
                // this.props.startTime.split(':')[0] +
                // '_' +
                // this.props.endTime.split(':')[0]).show();
            }
        }
    }

    getPendingSessionRequests() {
        const self = this;
        axios
            .post('/api/getPendingRequests', {_id:this.props.user._id})
            .then((response) => {
                if (response.data.success) {
                    self.setState({pendingRequests: response.data.docs});
                } else {
                    console.error(response.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }


    /**
     *
     */
    render() {
        this.props.socket.on(`session-request-${this.props.user._id}`, (data) => {
            this.getPendingSessionRequests();
        });
        const renEvent = this.props.currentEvent ?
            <TutorUpcomingEvent
                key={0}
                socket={this.props.socket}
                tutorId={this.props.user._id}
                calId={this.props.user.calendarId}
                gmail={this.props.user.gmail}
                dayName={this.props.dayName}
                today
                startTime={this.props.startTime || '0:00'}
                endTime={this.props.endTime || '0:00'}
                type='currentEvent'
                showModal={this.props.showModal}
            /> : this.state.pendingRequests.length === 0 ?
                <div className="text-center">
                    <h4 className="">No current sessions. <a href="#" onClick={() => this.setSessionDuration()}>Start a new session?</a></h4>
                </div> : '';
        const renSessionRequests = this.state.pendingRequests.map((request) =>
            <TutorSessionRequest
                sessionRequest={request}
                socket={this.props.socket}
                getPendingSessionRequests={this.getPendingSessionRequests}
                setSessionDuration={this.setSessionDuration}
            />);
        return (
            <div className="row animated fadeInLeft tutorCurrentEvent">
                <div className="col">
                    <div className="text-center row">
                        <div className="list-inline row">
                            <h4 className="lighter-text text-uppercase tutor-events-header">
                                Current Session
                            </h4>
                        </div>
                        <div className="col-xs-12">
                            {renEvent}
                            { this.state.pendingRequests.length > 0 ?
                                <div className="text-center">
                                    <h4>
                                        You have ({this.state.pendingRequests.length}) new session requests
                                    </h4>
                                </div>
                                : ''}
                            {renSessionRequests}
                        </div>
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
