/**
 * @file
 * SessionReviewModal.jsx
 *
 * @fileoverview
 * React Component for the Session Review Modal
 * for the tutor to add comments and add a rating
 * for the google hangouts session. It also contains
 * a link to re-enter the session.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

class SessionModal extends React.Component {
    /**
     * SessionModal constructor
     * set up rating stars
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            first_star: false,
            second_star: false,
            third_star: false,
            fourth_star: false,
            fifth_star: false,
            rating: 0,
            satisfaction: '',
            error_message: 'hide',
            comment: ''
        };
        this.changeStar = this.changeStar.bind(this);
        this.setRating = this.setRating.bind(this);
        this.changeStarOut = this.changeStarOut.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.approveStudent = this.approveStudent.bind(this);
        this.denyStudent = this.denyStudent.bind(this);
    }

    /**
     * Set the rating to a specific number and
     * set the satisfaction accordingly
     * @param number
     */
    setRating(number) {
        if (number === 1) {
            this.setState({ rating: 1, satisfaction: 'poor' });
        } else if (number === 2) {
            this.setState({ rating: 2, satisfaction: 'below average' });
        } else if (number === 3) {
            this.setState({ rating: 3, satisfaction: 'average' });
        } else if (number === 4) {
            this.setState({ rating: 4, satisfaction: 'very good' });
        } else if (number === 5) {
            this.setState({ rating: 5, satisfaction: 'excellent' });
        }
    }

    /**
     * Change the colored stars when the mouse hovers over
     * a new star
     * @param number
     */
    changeStar(number) {
        if (number === 1) {
            this.setState({
                first_star: true,
                second_star: false,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
        } else if (number === 2) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
        } else if (number === 3) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: false,
                fifth_star: false
            });
        } else if (number === 4) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: false
            });
        } else if (number === 5) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: true
            });
        }
    }

    /**
     * Empty colored stars when the mouse hovers away
     * from a star
     */
    changeStarOut() {
        const { rating } = this.state;
        if (rating === 0) {
            this.setState({
                first_star: false,
                second_star: false,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
        } else if (rating === 1) {
            this.setState({
                first_star: true,
                second_star: false,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
        } else if (rating === 2) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
        } else if (rating === 3) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: false,
                fifth_star: false
            });
        } else if (rating === 4) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: false
            });
        } else if (rating === 5) {
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: true
            });
        }
    }

    /**
     * Handle a change in the comments textarea
     * @param e
     */
    handleCommentChange(e) {
        this.setState({ comment: e.target.value });
    }

    /**
     * When the comments/ratings are submitted,
     * end the calendar event and delete the google
     * hangouts event while adding the rating/comment/
     * end time to the tutor session
     */
    // FIXME handle through redux
    handleSubmit() {
        const { onSubmit, tutorId } = this.props;
        const { rating, comment } = this.state;
        if (rating === 0) {
            this.setState({ error_message: 'show' });
        } else {
            axios
                .post('/calendar/endCalendarEvent', {
                    tutorId
                })
                .then(response => {
                    if (response.data.success) {
                        // this.setState({error_message:'hide'});
                        // TODO: What is this?
                        // eslint-disable-next-line no-undef
                        $('.modal').modal('hide');
                        onSubmit(rating, comment);
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    /**
     * Approve the student by updating the join
     * request in the database and sending a signal through
     * the socket to approve the student
     * @param join_request_param
     */
    approveStudent(join_request_param) {
        const { session, updateSession, socket } = this.props;
        const join_request = { ...join_request_param, status: 'approved' };
        const requestBody = {
            _id: session._id,
            join_request
        };
        axios
            .post('/api/updateJoinRequest', requestBody)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    updateSession(
                        response.data.session.hangouts_link,
                        response.data.session.eventId,
                        response.data.session
                    );
                    socket.emit('tutor-approve', {
                        session: response.data.session.eventId,
                        student_id: join_request.student_id
                    });
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Deny the student by updating the join
     * request in the database and sending a signal through
     * the socket to deny the student
     * @param join_request
     */
    denyStudent(join_request_param) {
        const { session, updateSession, socket } = this.props;
        const deny = prompt(
            'Are you sure you want to reject this join request? If so, please enter a reason. If not, please click Cancel.'
        );
        if (deny != null) {
            const join_request = {
                ...join_request_param,
                status: 'rejected',
                tutor_comment: deny
            };
            const requestBody = {
                _id: session._id,
                join_request
            };
            axios
                .post('/api/updateJoinRequest', requestBody)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data);
                        updateSession(
                            response.data.session.hangouts_link,
                            response.data.session.eventId,
                            response.data.session
                        );
                        socket.emit('tutor-deny', {
                            session: response.data.session.eventId,
                            reason: deny,
                            student_id: join_request.student_id
                        });
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    /**
     * Render the TutorModal
     * @returns {HTML}
     */
    render() {
        const { session, id } = this.props;
        const {
            error_message,
            first_star,
            second_star,
            third_star,
            fourth_star,
            fifth_star,
            rating,
            satisfaction,
            comment
        } = this.state;
        const renStudents = (session.students_attended || []).map(student => (
            <h5>{student.student_id}</h5>
        ));
        console.log(session.join_requests);
        const renRequests = (session.join_requests || [])
            .filter(student => student.status === 'pending')
            .map((student) => (
                <div className="student-join-request col-sm-12">
                    <h5 className="col-sm-3">{student.student_id}</h5>
                    <h5 className="col-sm-3">
                        {student.topic}
                        {/*  */}
                        {/* {session.join_requests[index].topic} */}
                    </h5>
                    <h5 className="lighter-text col-sm-4">
                        {student.student_comment
                            ? student.student_comment
                            : 'No Request Description'}
                    </h5>
                    <span
                        onClick={() => this.approveStudent(student)}
                        className="col-sm-1 glyphicon glyphicon-ok approve-student"
                    />
                    <span
                        onClick={() => this.denyStudent(student)}
                        className="col-sm-1 glyphicon glyphicon-remove deny-student"
                    />
                </div>
            ));
        console.log('MODAL DISPLAY');
        console.log(this.props.showModal);
        return (
            <div>
                {/* eslint-disable jsx-a11y/tabindex-no-positive, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-autofocus */}
                <div
                    className="modal"
                    id={`Modal_${id}`}
                    tabIndex="1000"
                    role="dialog"
                    aria-labelledby={`#Modal_${id}Label`}
                    aria-hidden={!this.props.showModal}
                    autoFocus
                >
                    {/* eslint-enable */}
                    <div className="modal-dialog" role="document">
                        <div className="modal-content tutor-modal review-modal">
                            <div className="modal-header text-center">
                                <h4
                                    className="modal-title rate-session-header text-uppercase"
                                    id="exampleModalLabel"
                                >
                                    Session Information
                                </h4>
                                <h5>
                                    <a
                                        href={session.hangouts_link}
                                        target="_blank"
                                    >
                                        Click here to re-enter the hangouts
                                    </a>
                                </h5>
                            </div>
                            <div className="modal-body tutor-modal-body">
                                <div id={`ModalBody_${id}`}>
                                    <div className="modal-body-session-info">
                                        <h4>
                                            <small>Student Join Requests</small>
                                        </h4>
                                        {renRequests.length === 0 ? (
                                            <h5 className="lighter-text">
                                                No Open Join Requests
                                            </h5>
                                        ) : (
                                            renRequests
                                        )}
                                    </div>
                                    <div className="modal-body-session-info">
                                        <h4>
                                            <small>Students In Session</small>
                                        </h4>
                                        {renStudents.length === 0 ? (
                                            <h5 className="lighter-text">
                                                No Students in Session
                                            </h5>
                                        ) : (
                                            renStudents
                                        )}
                                    </div>
                                    <div className="modal-body-session-rating">
                                        <h4>
                                            <small>
                                                How was your tutoring session?
                                            </small>
                                        </h4>
                                        <h5
                                            className={`text-uppercase modal-error-${error_message}`}
                                        >
                                            Rating must be nonzero
                                        </h5>
                                        <span
                                            onMouseOver={() =>
                                                this.changeStar(1)
                                            }
                                            onMouseOut={this.changeStarOut}
                                            onClick={() => this.setRating(1)}
                                        >
                                            <img
                                                alt="first_star"
                                                className="star"
                                                src={
                                                    first_star
                                                        ? '/images/full-star.png'
                                                        : '/images/empty-star.png'
                                                }
                                                width="25"
                                                height="25"
                                            />
                                        </span>
                                        <span
                                            onMouseOver={() =>
                                                this.changeStar(2)
                                            }
                                            onMouseOut={this.changeStarOut}
                                            onClick={() => this.setRating(2)}
                                        >
                                            <img
                                                alt="second_star"
                                                className="star"
                                                src={
                                                    second_star
                                                        ? '/images/full-star.png'
                                                        : '/images/empty-star.png'
                                                }
                                                width="25"
                                                height="25"
                                            />
                                        </span>
                                        <span
                                            onMouseOver={() =>
                                                this.changeStar(3)
                                            }
                                            onMouseOut={this.changeStarOut}
                                            onClick={() => this.setRating(3)}
                                        >
                                            <img
                                                alt="third_star"
                                                className="star"
                                                src={
                                                    third_star
                                                        ? '/images/full-star.png'
                                                        : '/images/empty-star.png'
                                                }
                                                width="25"
                                                height="25"
                                            />
                                        </span>
                                        <span
                                            onMouseOver={() =>
                                                this.changeStar(4)
                                            }
                                            onMouseOut={this.changeStarOut}
                                            onClick={() => this.setRating(4)}
                                        >
                                            <img
                                                alt="fourth_star"
                                                className="star"
                                                src={
                                                    fourth_star
                                                        ? '/images/full-star.png'
                                                        : '/images/empty-star.png'
                                                }
                                                width="25"
                                                height="25"
                                            />
                                        </span>
                                        <span
                                            onMouseOver={() =>
                                                this.changeStar(5)
                                            }
                                            onMouseOut={this.changeStarOut}
                                            onClick={() => this.setRating(5)}
                                        >
                                            <img
                                                alt="fifth_star"
                                                className="star"
                                                src={
                                                    fifth_star
                                                        ? '/images/full-star.png'
                                                        : '/images/empty-star.png'
                                                }
                                                width="25"
                                                height="25"
                                            />
                                        </span>
                                        <span>
                                            <h5 className="rating-span">
                                                {`${rating /
                                                    5} ${satisfaction}`}
                                            </h5>
                                        </span>
                                        <h5>
                                            Leave some comments about any issues
                                            or misbehaving students (optional)
                                        </h5>
                                        <textarea
                                            className="input-sm input feedback-text"
                                            value={comment}
                                            onChange={this.handleCommentChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default mac_button"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={this.handleSubmit}
                                    className="btn btn-default mac_button_inverse"
                                >
                                    End Session
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SessionModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    tutorId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
    updateSession: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    studentView: state.studentView
});

const SessionReviewModal = connect(
    mapStateToProps,
    null
)(SessionModal);

export default SessionReviewModal;
