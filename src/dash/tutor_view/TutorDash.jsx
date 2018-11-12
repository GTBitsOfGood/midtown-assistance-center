import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import TutorUpcomingEvents from './TutorUpcomingEvents';
import TutorEvents from './TutorEvents';
import Feedback from './Feedback';
import TutorProfile from './Profile';
import Statistics from './Statistics';

const SOCKETIO_ENDPOINT =
    window.location.hostname +
    (window.location.port ? `:${window.location.port}` : '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

class TutorDash extends React.Component {
    // TODO: socket stuff

    componentWillUnmount() {
        // socket.close();
    }

    render() {
        const { user } = this.props;
        let dashDisplay = null;
        if (user.approved && user.confirmed) {
            dashDisplay = (
                <div>
                    <TutorEvents socket={socket} />
                    <Statistics />
                    <Feedback />
                </div>
            );
        } else if (user.confirmed) {
            dashDisplay = (
                <h4 className="alert alert-warning tutor-approval-msg">
                    <i className="glyphicon glyphicon-exclamation-sign tutor-approval-msg-glyph" aria-hidden="true" />
                    Your profile is awaiting approval. Edit your profile and check back soon!
                </h4>
            );
        } else {
            dashDisplay = (
                <h4 className="alert alert-warning tutor-approval-msg">
                    <i className="glyphicon glyphicon-exclamation-sign tutor-approval-msg-glyph" aria-hidden="true" />
                    We've sent an email to you. Please click the link in that message to confirm your email address.
                </h4>
            );
        }
        return (
            <div className="tutor-dash container col-xs-12">
                <div className="col-md-6 upcoming-events-list">
                    {dashDisplay}
                </div>
                <div className="col-md-6">
                    <TutorProfile />
                </div>
            </div>
        );
    }
}

TutorDash.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(TutorDash);
