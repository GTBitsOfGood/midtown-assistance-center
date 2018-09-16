import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './Review';

const Feedback = props => {
    /**
     * Create review components for each student review
     * and render them
     * @returns {HTML}
     */
    const { user } = props;
    const renSessions = [];
    const sessions = !user.sessions.sessions ? [] : user.sessions.sessions;
    let keyId = 0;
    if (sessions) {
        sessions.forEach((session, index) => {
            sessions[index].students_attended.forEach(student_review => {
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
            });
        });
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
};

Feedback.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(Feedback);
