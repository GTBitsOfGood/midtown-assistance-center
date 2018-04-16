import React from 'react';
import { connect } from 'react-redux';
import { saveTutor } from '../../redux/actions/user_actions.js';
import Review from './Review.jsx';

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: {},
            renderSessions: {}
        };
    }

    /**
     * Create review components for each student review
     * and render them
     * @returns {HTML}
     */
    render() {
        let renSessions = [];
        const sessions = !this.props.user.sessions
            ? []
            : this.props.user.sessions.sessions;
        let keyId = 0;
        if (this.props.user.sessions) {
            for (let session in sessions) {
                for (
                    let review = 0;
                    review < sessions[session].students_attended.length;
                    review++
                ) {
                    let student_review =
                        sessions[session].students_attended[review];
                    if (student_review.student_rating !== null) {
                        renSessions.unshift(
                            <Review
                                key={keyId++}
                                time={student_review.time}
                                rating={student_review.student_rating}
                                comment={student_review.student_comment}
                            />
                        );
                    }
                }
            }
        }

        return (
            <div className="row animated fadeInRight feedback">
                <div className="col">
                    <div className="text-center">
                        <h4 className="lighter-text text-uppercase tutor-events-header">
                            {' '}
                            Feedback
                        </h4>
                    </div>
                    <div className="feedbackWrapper col-xs-12">
                        {renSessions.length === 0 ? (
                            <div className="text-center">
                                <h5>You do not have any feedback yet</h5>
                            </div>
                        ) : (
                            renSessions
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
