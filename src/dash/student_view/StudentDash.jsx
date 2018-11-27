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
    }

    componentDidMount() {
        const { getOnlineTutors } = this.props;
        getOnlineTutors('online');
    }

    updateOnlineTutors() {
        this.props.updateOnlineTutors(this.props.studentView.searchType, this.props.studentView.searchSubject, this.props.studentView.searchTime);
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
                this.updateOnlineTutors();
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
    updateOnlineTutors: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
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
