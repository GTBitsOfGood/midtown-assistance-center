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
    componentDidMount() {
        const { getOnlineTutors } = this.props;
        getOnlineTutors('online');
    }

    render() {
        const { user } = this.props;
        let dashDisplay = null;
        if (user.banned) {
            dashDisplay = (
                <div>
                    <h4 className="text-center">
                        You have been banned! Contact your admin for more information.
                    </h4>
                </div>
            );
        } else {
            socket.on('update-tutors', () => {
                console.log('Tutor update!');
                window.location.reload();
            });
            dashDisplay = (
                <div>
                    <div className="col-md-12 atlanta">
                        <DashSearchBar />
                    </div>
                    <TutorSearchList socket={socket} />
                </div>
            );
        }
        return (
            <div>
                {dashDisplay}
            </div>
        );
    }
}

StudentDashboard.propTypes = {
    getOnlineTutors: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    getOnlineTutors: (searchType, subject, time) => dispatch(getOnlineTutors(searchType, subject, time)),
});

const StudentDash = connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentDashboard);

export default StudentDash;
