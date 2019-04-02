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
import ReportModal from './ReportModal';

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
            comment: '',
            receivedLink: false,
            modalShowing: false
        };
        this.changeStar = this.changeStar.bind(this);
        this.setRating = this.setRating.bind(this);
        this.changeStarOut = this.changeStarOut.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.approveStudent = this.approveStudent.bind(this);
        this.denyStudent = this.denyStudent.bind(this);
        this.modalButtonClick = this.modalButtonClick.bind(this);
    }

    componentDidMount() {
        if (this.props.showModal) {
            $(
                `#Modal_${this.props.id}`
            ).modal('show');
        }
    }

    componentDidUpdate() {
        if (this.props.showModal && this.props.session.hangouts_link && !this.state.receivedLink) {
            window.open(this.props.session.hangouts_link, '_blank');
            this.setState({receivedLink:true});
        }
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
        const starState = {
            first_star: false,
            second_star: false,
            third_star: false,
            fourth_star: false,
            fifth_star: false
        };
        // TODO: Ensure the keys are always returned in the same order
        const starStateKeys = Object.keys(starState);
        for (let i = 0; i < number; i++) {
            starState[starStateKeys[i]] = true;
        }
        this.setState(starState);
    }

    /**
     * Empty colored stars when the mouse hovers away
     * from a star
     */
    changeStarOut() {
        const { rating } = this.state;
        this.changeStar(rating);
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
                        console.error(response.data.error);
                    }
                })
                .catch(error => {
                    console.error(error);
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
                    updateSession(
                        response.data.session
                    );
                    socket.emit('tutor-approve', {
                        session: response.data.session.eventId,
                        student_id: join_request.student_id
                    });
                } else {
                    console.error(response.data.error);
                }
            })
            .catch(err => {
                console.error(err);
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
                        updateSession(
                            response.data.session
                        );
                        socket.emit('tutor-deny', {
                            session: response.data.session.eventId,
                            reason: deny,
                            student_id: join_request.student_id
                        });
                    } else {
                        console.error(response.data.error);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }



    modalButtonClick() {
        this.setState(state => ({
            modalShowing: !state.modalShowing
        }));
        window.open(this.props.session.hangouts_link);
        return false;
    }

    /**
     * Render the TutorModal
     * @returns {HTML}
     */
    render() {const { session, id } = this.props;
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
            <div className="student-join-request col-sm-12" key={student.student_id}>
                <h5 className="col-sm-10">{student.student_id}</h5>
                <span
                    className="col-sm-2 glyphicon glyphicon-remove deny-student"
                    data-toggle="modal"
                    data-target={`#Modal_${student.student_id}`}
                    data-backdrop="static"
                />
                <ReportModal
                    student_id={student.student_id}
                    modal_id={student.student_id}
                />
            </div>
        ));
        const renRequests = (session.join_requests || [])
            .filter(student => student.status === 'pending' || student.status === 'approved')
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
                    {
                        student.status === 'pending' ?
                            <div>
                                <span
                                    onClick={() => this.approveStudent(student)}
                                    className="col-sm-1 glyphicon glyphicon-ok approve-student"
                                />
                                <span
                                    onClick={() => this.denyStudent(student)}
                                    className="col-sm-1 glyphicon glyphicon-remove deny-student"
                                />
                            </div> : <div><h5 className="approve-student">approved</h5></div>
                    }

                </div>
            ));
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
                                        data-dismiss="modal"
                                        data-toggle='modal'
                                        data-target={`#Guidelines_${id}`}
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
                                                {`${rating}/5 ${satisfaction}`}
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
    tutorId: state.user._id
});

const SessionReviewModal = connect(
    mapStateToProps,
    null
)(SessionModal);

export default SessionReviewModal;
