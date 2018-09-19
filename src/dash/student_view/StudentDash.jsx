import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import DashSearchBar from './SearchBar';
import TutorSearchList from './TutorSearchList';
import {
    getOnlineTutors
} from '../../redux/actions/student_view_actions';

const SOCKETIO_ENDPOINT =
    window.location.hostname +
    (window.location.port ? `:${window.location.port}` : '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

class StudentDashboard extends React.Component {
    constructor(props) {
        super(props);

        props.getOnlineTutors();
    }

    render() {
        socket.on('update-tutors', () => {
            console.log('Tutor update!');
            window.location.reload();
        });
        return (
            <div>
                <div className="col-md-12 atlanta">
                    <DashSearchBar />
                </div>
                <TutorSearchList socket={socket} />
            </div>
        );
    }
}

StudentDashboard.propTypes = {
    getOnlineTutors: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        getOnlineTutors: (searchType, subject, time) => dispatch(getOnlineTutors(searchType, subject, time)), 
    };
}

const StudentDash = connect(
    null,
    mapDispatchToProps
)(StudentDashboard);

export default StudentDash;
