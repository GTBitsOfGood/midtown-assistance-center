import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios/index';
import ReportModal from './ReportModal';

class TutorModal extends React.Component {
    constructor(props) {
        super(props);

        const { subjects, session, username } = props;

        this.state = {
            approval: 'new',
            first_star: false,
            second_star: false,
            third_star: false,
            fourth_star: false,
            fifth_star: false,
            rating: 0,
            satisfaction: '',
            error_message: 'hide',
            comment: '',
            request: '',
            topic: subjects[0] ? subjects[0].subject : '',
            rejection_reason: '',
        };

        if (session) {
            session.join_requests.forEach(join_request => {
                if (join_request.student_id === username) {
                    if (join_request.status === 'pending') {
                        this.state.request = join_request.student_comment;
                        this.state.topic = join_request.topic;
                    } else if (join_request.status === 'rejected') {
                        this.state.rejection_reason = join_request.tutor_comment;
                    }
                    // another possibility: status == 'approved'
                    this.state.approval = join_request.status;
                }
            });

            session.students_attended.forEach(student_attended => {
                if (student_attended.student_id === username) {
                    this.state.approval = 'in_session';
                    this.state.rating = student_attended.student_rating;
                    this.state.comment = student_attended.student_comment;
                }
            });
        }

        this.changeStar = this.changeStar.bind(this);
        this.setRating = this.setRating.bind(this);
        this.changeStarOut = this.changeStarOut.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
        this.handleGeneralChange = this.handleGeneralChange.bind(this);
        this.handleJoinSession = this.handleJoinSession.bind(this);
        this.setApproval = this.setApproval.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.session && this.props.session !== prevProps.session) {
            this.setApproval();
        }
    }

    setApproval() {
        const { session, username } = this.props;
        session.join_requests.forEach(join_request => {
            if (join_request.student_id === username) {
                if (join_request.status === 'pending') {
                    this.setState({
                        request:join_request.student_comment,
                        topic:join_request.topic
                    });
                } else if (join_request.status === 'rejected') {
                    this.setState({
                        rejection_reason:join_request.tutor_comment
                    });
                }
                // another possibility: status == 'approved'
                this.setState({
                    approval:join_request.status
                });
            }
        });

        session.students_attended.forEach(student_attended => {
            if (student_attended.student_id === username) {
                this.setState({
                    approval:'in_session',
                    rating:student_attended.student_rating,
                    comment:student_attended.student_comment
                });
            }
        });
    }

    setRating(number) {
        switch (number) {
        case 1:
            this.setState({ satisfaction: 'poor' });
            break;
        case 2:
            this.setState({ satisfaction: 'below average' });
            break;
        case 3:
            this.setState({ satisfaction: 'average' });
            break;
        case 4:
            this.setState({ satisfaction: 'very good' });
            break;
        case 5:
            this.setState({ satisfaction: 'excellent' });
            break;
        default:
            this.setState({ satisfaction: 'poor' });
            break;
        }
        this.setState({ rating: number });
    }

    changeStar(number) {
        switch (number) {
        case 1:
            this.setState({
                first_star: true,
                second_star: false,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
            break;
        case 2:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
            break;
        case 3:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: false,
                fifth_star: false
            });
            break;
        case 4:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: false
            });
            break;
        case 5:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: true
            });
            break;
        default:
            this.setState({
                first_star: false,
                second_star: false,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
            break;
        }
    }

    changeStarOut() {
        const { rating } = this.state;
        switch (rating) {
        case 1:
            this.setState({
                first_star: true,
                second_star: false,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
            break;
        case 2:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
            break;
        case 3:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: false,
                fifth_star: false
            });
            break;
        case 4:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: false
            });
            break;
        case 5:
            this.setState({
                first_star: true,
                second_star: true,
                third_star: true,
                fourth_star: true,
                fifth_star: true
            });
            break;
        default:
            this.setState({
                first_star: false,
                second_star: false,
                third_star: false,
                fourth_star: false,
                fifth_star: false
            });
            break;

        }
    }

    handleGeneralChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // eslint-disable-next-line class-methods-use-this
    handleCloseModal() {
        $('.modal').modal('hide');
    }

    handleSubmitRequest() {
        const { username, session, socket } = this.props;
        const { request, topic } = this.state;
        const joinRequest = {
            student_id: username,
            student_comment: request,
            topic,
            status: 'pending'
        };
        const requestBody = {
            _id: session._id,
            join_request: joinRequest
        };
        axios
            .post('/api/addJoinRequest', requestBody)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data);
                    socket.emit('student-request', {
                        session: response.data.session.eventId,
                        student: username,
                        topic,
                        request
                    });
                    this.setState({ approval: 'pending' });
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleCancel() {
        // let now = new Date();
        // let studentRatingObj = {
        //     student_id: this.props.username,
        //     time: now
        // };
        // let request = {
        //     _id: this.props.session._id,
        //     review: studentRatingObj
        // };
        // axios.post('/api/studentSubmitReview', request)
        //     .then(function(response){
        //         if (response.data.success) {
        //             console.log(response.data);
        //         } else {
        //             console.log(response.data.error);
        //         }
        //     })
        //     .catch(function(err) {
        //         console.log(err);
        //     });
        this.setState({ error_message: 'hide' });
        $('.modal').modal('hide');
    }

    handleSubmit() {
        const { username, session } = this.props;
        const { rating, comment } = this.state;
        if (rating === 0) {
            this.setState({ error_message: 'show' });
        } else {
            const studentRatingObj = {
                student_id: username,
                student_rating: rating,
                student_comment: comment
            };
            const request = {
                _id: session._id,
                review: studentRatingObj
            };
            axios
                .post('/api/studentUpdateReview', request)
                .then((response) => {
                    if (response.data.success) {
                        console.log(response.data);
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            this.setState({ error_message: 'hide' });
            $('.modal').modal('hide');
        }
    }

    handleJoinSession() {
        const { username, socket, session, updateTutors } = this.props;
        const { rating, comment } = this.state;
        const now = new Date();
        const studentRatingObj = {
            student_id: username,
            student_rating: rating,
            student_comment: comment,
            time: now
        };
        const request = {
            _id: session._id,
            review: studentRatingObj
        };
        axios
            .post('/api/studentSubmitReview', request)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data);
                    this.setState({
                        error_message: 'hide',
                        approval: 'in_session'
                    });
                    socket.emit('student-join', {
                        session: session.eventId,
                        student: username
                    });
                    updateTutors();
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { subjects, favorites, socket, session, username, firstName, tutor_id } = this.props;
        const {
            approval,
            error_message,
            first_star,
            second_star,
            third_star,
            fourth_star,
            fifth_star,
            satisfaction,
            request,
            topic,
            rejection_reason,
            rating,
            comment

        } = this.state;

        const subject_select = subjects.map((subject) => (
            <option>{subject.subject}</option>
        ));
        const favorite_select = favorites.map((fav) => (
            <option>{fav.favorite}</option>
        ));

        socket.on(
            `student-session-update-${session ? session.eventId : 'unused'}${username}`,
            data => {
                if (data.approved) {
                    this.setState({ approval: 'approved' });
                } else {
                    this.setState({
                        approval: 'rejected',
                        rejection_reason: data.reason
                    });
                }
                // this.props.updateTutors();
            }
        );
        const submitButton = (
            <button
                type="submit"
                onClick={
                    approval === 'in_session'
                        ? this.handleSubmit
                        : this.handleSubmitRequest
                }
                className="btn btn-default mac_button_inverse"
            >
                Submit
            </button>
        );

        const reportButton = (
            <button
                className="btn btn-md btn-default mac_button_warning"
                type="button"
                data-toggle="modal"
                data-target={`#Report_Modal_${tutor_id}`}
                data-backdrop="static"
            >
                Report Tutor
            </button>
        );

        const in_session_html = (
            <div>
                {session ? (
                    <h5>
                        <a
                            href={session.hangouts_link}
                            target="_blank"
                        >
                            Click here to re-enter the hangouts
                        </a>
                    </h5>
                ) : (
                    ''
                )}
                <h4>
                    How was your tutoring session with {firstName}?
                </h4>
                <h5
                    className={`text-uppercase modal-error-${error_message}`}
                >
                    Rating must be nonzero
                </h5>
                <span
                    onMouseOver={() => this.changeStar(1)}
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
                    />
                </span>
                <span
                    onMouseOver={() => this.changeStar(2)}
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
                    />
                </span>
                <span
                    onMouseOver={() => this.changeStar(3)}
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
                    />
                </span>
                <span
                    onMouseOver={() => this.changeStar(4)}
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
                    />
                </span>
                <span
                    onMouseOver={() => this.changeStar(5)}
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
                    />
                </span>
                <span>
                    <h4 className="rating-span">
                        ({rating}/5) {satisfaction}
                    </h4>
                </span>
                <h5>Leave some feedback (optional)</h5>
                <textarea
                    value={comment}
                    name="comment"
                    onChange={this.handleGeneralChange}
                    className="input-sm input feedback-text"
                />
                { submitButton }
            </div>
        );
        const approved_html = (
            <div>
                <h4>
                    Your Request to join the session with {firstName}{' '}
                    was approved
                </h4>
                {session ? (
                    <h5>
                        <a
                            href={session.hangouts_link}
                            target="_blank"
                            onClick={this.handleJoinSession}
                        >
                            Click here to enter the hangouts
                        </a>
                    </h5>
                ) : (
                    ''
                )}
            </div>
        );
        const pending_html = (
            <div>
                <h5>What can {firstName} help you with?</h5>
                <select
                    name="topic"
                    onChange={this.handleGeneralChange}
                    defaultValue={topic}
                    className="input input-sm"
                >
                    {subject_select}
                    {favorite_select}
                </select>
                <h5>More Details (Optional)</h5>
                <textarea
                    name="request"
                    value={request}
                    onChange={this.handleGeneralChange}
                    className="input-sm input feedback-text"
                />
                <h6>
                    {approval === 'new'
                        ? ''
                        : 'Your request is awaiting approval from the tutor'}
                </h6>
            </div>
        );
        const rejected_html = (
            <div>
                <h5>
                    Unfortunately, your request to join this session was
                    rejected by the tutor because of the following reason
                </h5>
                <h4>{rejection_reason}</h4>
            </div>
        );
        let resHtml = null;
        if(approval === 'in_session') {
            resHtml = in_session_html;
        } else if (approval === 'pending' || approval === 'new') {
            resHtml = pending_html;
        } else if (approval === 'approved') {
            resHtml = approved_html;
        } else if (approval === 'rejected') {
            resHtml = rejected_html;
        }
        return (
            <div>
                <div
                    className="modal"
                    id={`Modal_${firstName}`}
                    tabIndex="1000"
                    role="dialog"
                    aria-labelledby={`#Modal_${firstName}Label`}
                    aria-hidden="true"
                    autoFocus
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content review-modal">
                            <div className="modal-header text-center">
                                <h4
                                    className="modal-title rate-session-header text-uppercase"
                                    id="exampleModalLabel"
                                >
                                    {approval === 'in_session'
                                        ? 'Rate your session'
                                        : 'Submit Request to Join Session'}
                                </h4>
                            </div>
                            <div className="modal-body text-center">
                                <div id={`ModalBody_${firstName}`}>
                                    {resHtml}
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button
                                    type="button"
                                    onClick={
                                        approval === 'approved'
                                            ? this.handleCancel
                                            : this.handleCloseModal
                                    }
                                    className="btn btn-default mac_button"
                                >
                                    {approval !== 'rejected'
                                        ? 'Cancel'
                                        : 'Close'}
                                </button>
                                {approval === 'in_session' || approval === 'new'
                                    ? reportButton
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <ReportModal
                    tutor_id={tutor_id}
                />
            </div>
        );
    }
}

TutorModal.propTypes = {
    subjects: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    updateTutors: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired,
    firstName: PropTypes.string.isRequired,
    tutor_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    studentView: state.studentView
});

const TutorReviewModal = connect(
    mapStateToProps,
    null
)(TutorModal);

export default TutorReviewModal;
