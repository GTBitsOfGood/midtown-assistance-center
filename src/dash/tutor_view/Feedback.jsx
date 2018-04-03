import React from 'react';
import { connect } from 'react-redux';
import { saveTutor, getSessions } from '../../redux/actions/user_actions.js';
import axios from 'axios';
import Review from './Review.jsx';

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: {},
            renderSessions: {}
        };
        // this.getSessions = this.getSessions.bind(this);
    }

    /**
     * Get all of the sessions for the tutor from the database
     * on mount
     */
    componentDidMount() {
        this.props.getSessions(this.props.user);
    }


    /**
     * Create review components for each student review
     * and render them
     * @returns {HTML}
     */
    render() {
        let renSessions = [];
        const sessions = !this.props.user.sessions ? [] : this.props.user.sessions.sessions;
        let keyId = 0;
        if (this.props.user.sessions) {
            for (let session in sessions) {
                for (let review in sessions[session].students_attended) {
                    let student_review = sessions[session].students_attended[review];
                    if (student_review.student_rating !== null) {
                        renSessions.push(<Review key={keyId++} time={student_review.time} rating={student_review.student_rating} comment={student_review.student_comment}/>);
                    }
                }
            }
        }

        return (
            <div className="row animated fadeInRight">
                <div className="col">
                    <div className="text-center">
                        <h4 className="lighter-text text-uppercase tutor-events-header"> Feedback</h4>
                    </div>
                    <div className="feedbackWrapper col-xs-12">
                        {renSessions.length === 0 ? <div className="text-center"><h5>You do not have any feedback yet</h5></div> : renSessions}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(saveTutor(user)),
        getSessions: (user) => dispatch(getSessions(user))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback);