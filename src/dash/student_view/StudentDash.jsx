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
        this.updateOnlineTutors = this.updateOnlineTutors.bind(this);
        props.getOnlineTutors('online');
    }

    updateOnlineTutors() {
        this.props.updateOnlineTutors(this.props.studentView.searchType, this.props.studentView.searchSubject, this.props.studentView.searchTime);
    }

    render() {
        socket.on('update-tutors', () => {
            console.log('Tutor update!');
            this.updateOnlineTutors();
        });
        return (
            <div>
                <div className="col-md-12 atlanta">
                    <DashSearchBar />
                </div>
                <TutorSearchList socket={socket} updateOnlineTutors={this.updateOnlineTutors} />
            </div>
        );
    }
}

StudentDashboard.propTypes = {
    getOnlineTutors: PropTypes.func.isRequired,
    updateOnlineTutors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    studentView: state.studentView,
    user: state.user
});

function mapDispatchToProps(dispatch) {
    return {
        getOnlineTutors: (searchType, subject, time) => dispatch(getOnlineTutors(searchType, subject, time)),
        updateOnlineTutors: (searchType, subject, time) => dispatch(getOnlineTutors(searchType, subject, time))
    };
}

const StudentDash = connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentDashboard);

export default StudentDash;
