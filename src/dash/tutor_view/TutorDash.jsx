import React from 'react';
import TutorUpcomingEvents from './TutorUpcomingEvents.jsx';
import Feedback from './Feedback.jsx';
import { connect } from 'react-redux';
import TutorProfile from './Profile.jsx';
import socketIOClient from "socket.io-client";

const SOCKETIO_ENDPOINT = window.location.hostname+(window.location.port ? ':'+window.location.port: '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

class TutorDash extends React.Component {

    componentWillUnmount() {
        socket.close();
    }

    render() {

        return (
            <div className="tutor-dash container col-xs-12">
                <div className="col-md-6">
                    <TutorProfile/>
                </div>
                <div className="col-md-6 upcoming-events-list">
                    { this.props.user.approved ?
                        <div>
                            <TutorUpcomingEvents socket={socket}></TutorUpcomingEvents>
                            <Feedback></Feedback>
                        </div> :
                        <h4 className="tutor-approval-msg">Your profile is awaiting approval. Edit your profile and check back soon!</h4>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // Since we never use the redux state here
    console.log(state);
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(updateUser(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TutorDash);