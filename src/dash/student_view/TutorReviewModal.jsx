import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';

class TutorModal extends React.Component {
    constructor(props) {
        super(props);
        this.initTutorModal = this.initTutorModal.bind(this);
        let init = this.initTutorModal();
        this.state = {
            approval: init.status,
            first_star: false,
            second_star: false,
            third_star: false,
            fourth_star: false,
            fifth_star: false,
            rating: init.rating,
            satisfaction: '',
            error_message: 'hide',
            comment: init.comment,
            request: init.request,
            topic: init.topic,
            rejection_reason: init.rejection_reason
        };
        this.changeStar = this.changeStar.bind(this);
        this.setRating = this.setRating.bind(this);
        this.changeStarOut = this.changeStarOut.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
        this.handleRequestChange = this.handleRequestChange.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleJoinSession = this.handleJoinSession.bind(this);
    }

    initTutorModal() {
        let status = 'new';
        let join_request_comment = '';
        let topic = this.props.subjects[0] ? this.props.subjects[0].subject : '';
        let rejection_reason = '';
        let rating = 0;
        let comment = '';
        if (this.props.session) {
            for (let request in this.props.session.join_requests) {
                let join_request = this.props.session.join_requests[request];
                if (join_request.student_id === this.props.username) {
                    if (join_request.status === 'pending') {
                        status = 'pending';
                        join_request_comment = join_request.student_comment;
                        topic = join_request.topic;
                    } else if (join_request.status === 'rejected') {
                        status = 'rejected';
                        rejection_reason = join_request.tutor_comment;
                    } else if (join_request.status === 'approved') {
                        status = 'approved';
                    }
                }
            }
            for (let student in this.props.session.students_attended) {
                let student_attended = this.props.session.students_attended[
                    student
                ];
                if (student_attended.student_id === this.props.username) {
                    status = 'in_session';
                    rating = student_attended.student_rating;
                    comment = student_attended.student_comment;
                }
            }
        }
        return {
            status: status,
            request: join_request_comment,
            topic: topic,
            rejection_reason: rejection_reason,
            rating: rating,
            comment: comment
        };
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
        }
    }

    changeStarOut() {
        switch (this.state.rating) {
            case 0:
                this.setState({
                    first_star: false,
                    second_star: false,
                    third_star: false,
                    fourth_star: false,
                    fifth_star: false
                });
                break;
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
        }
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
        }
        this.setState({ rating: number });
    }

    handleCommentChange(e) {
        this.setState({ comment: e.target.value });
    }

    handleTopicChange(e) {
        this.setState({ topic: e.target.value });
    }

    handleRequestChange(e) {
        this.setState({ request: e.target.value });
    }

    handleCloseModal() {
        $('.modal').modal('hide');
    }

    handleSubmitRequest() {
        let joinRequest = {
            student_id: this.props.username,
            student_comment: this.state.request,
            topic: this.state.topic,
            status: 'pending'
        };
        let requestBody = {
            _id: this.props.session._id,
            join_request: joinRequest
        };
        let self = this;
        axios
            .post('/api/addJoinRequest', requestBody)
            .then(function(response) {
                if (response.data.success) {
                    console.log(response.data);
                    self.props.socket.emit('student-request', {
                        session: response.data.session.eventId,
                        student: self.props.username,
                        topic: self.state.topic,
                        request: self.state.request
                    });
                    self.setState({ approval: 'pending' });
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
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
        if (this.state.rating === 0) {
            this.setState({ error_message: 'show' });
        } else {
            let studentRatingObj = {
                student_id: this.props.username,
                student_rating: this.state.rating,
                student_comment: this.state.comment
            };
            let request = {
                _id: this.props.session._id,
                review: studentRatingObj
            };
            axios
                .post('/api/studentUpdateReview', request)
                .then(function(response) {
                    if (response.data.success) {
                        console.log(response.data);
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
            this.setState({ error_message: 'hide' });
            $('.modal').modal('hide');
        }
    }

    handleJoinSession() {
        let now = new Date();
        let studentRatingObj = {
            student_id: this.props.username,
            student_rating: this.state.rating,
            student_comment: this.state.comment,
            time: now
        };
        let request = {
            _id: this.props.session._id,
            review: studentRatingObj
        };
        let self = this;
        axios
            .post('/api/studentSubmitReview', request)
            .then(function(response) {
                if (response.data.success) {
                    console.log(response.data);
                    self.setState({
                        error_message: 'hide',
                        approval: 'in_session'
                    });
                    self.props.socket.emit('student-join', {
                        session: self.props.session.eventId,
                        student: self.props.username
                    });
                    self.props.updateTutors();
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    render() {
        let subject_select = this.props.subjects.map((subject, num) => {
            return <option>{subject.subject}</option>;
        });
        let favorite_select = this.props.favorites.map((fav, num) => {
            return <option>{fav.favorite}</option>;
        });
        this.props.socket.on(
            'student-session-update-' +
                (this.props.session ? this.props.session.eventId : 'unused') +
                this.props.username,
            data => {
                console.log('Session update!');
                console.log(data);
                if (data.approved) {
                    this.setState({ approval: 'approved' });
                } else {
                    this.setState({
                        approval: 'rejected',
                        rejection_reason: data.reason
                    });
                }
                //this.props.updateTutors();
            }
        );

        const in_session_html = (
            <div>
                {this.props.session ? (
                    <h5>
                        <a
                            href={this.props.session.hangouts_link}
                            target="_blank"
                        >
                            Click here to re-enter the hangouts
                        </a>
                    </h5>
                ) : (
                    ''
                )}
                <h4>
                    How was your tutoring session with {this.props.firstName}?
                </h4>
                <h5
                    className={
                        'text-uppercase modal-error-' + this.state.error_message
                    }
                >
                    Rating must be nonzero
                </h5>
                <span
                    onMouseOver={() => this.changeStar(1)}
                    onMouseOut={this.changeStarOut}
                    onClick={() => this.setRating(1)}
                >
                    <img
                        className="star"
                        src={
                            this.state.first_star
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
                        className="star"
                        src={
                            this.state.second_star
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
                        className="star"
                        src={
                            this.state.third_star
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
                        className="star"
                        src={
                            this.state.fourth_star
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
                        className="star"
                        src={
                            this.state.fifth_star
                                ? '/images/full-star.png'
                                : '/images/empty-star.png'
                        }
                    />
                </span>
                <span>
                    <h4 className="rating-span">
                        ({this.state.rating}/5) {this.state.satisfaction}
                    </h4>
                </span>
                <h5>Leave some feedback (optional)</h5>
                <textarea
                    value={this.state.comment}
                    onChange={this.handleCommentChange}
                    className="input-sm input feedback-text"
                />
            </div>
        );
        const approved_html = (
            <div>
                <h4>
                    Your Request to join the session with {this.props.firstName}{' '}
                    was approved
                </h4>
                {this.props.session ? (
                    <h5>
                        <a
                            href={this.props.session.hangouts_link}
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
                <h5>What can {this.props.firstName} help you with?</h5>
                <select
                    onChange={this.handleTopicChange}
                    defaultValue={this.state.topic}
                    className="input input-sm"
                >
                    {subject_select}
                    {favorite_select}
                </select>
                <h5>More Details (Optional)</h5>
                <textarea
                    value={this.state.request}
                    onChange={this.handleRequestChange}
                    className="input-sm input feedback-text"
                />
                <h6>
                    {this.state.approval === 'new'
                        ? ''
                        : 'Your request is awaiting approval from the tutor'}
                </h6>
            </div>
        );
        const rejected_html = (
            <div>
                <h4>REJECTED U NOOB BC {this.state.rejection_reason}</h4>
            </div>
        );
        const submitButton = (
            <button
                type="submit"
                onClick={
                    this.state.approval === 'in_session'
                        ? this.handleSubmit
                        : this.handleSubmitRequest
                }
                className="btn btn-default mac_button_inverse"
            >
                Submit
            </button>
        );
        return (
            <div>
                <div
                    className="modal"
                    id={'Modal_' + this.props.firstName}
                    tabIndex="1000"
                    role="dialog"
                    aria-labelledby={'#Modal_' + this.props.firstName + 'Label'}
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
                                    {this.state.approval === 'in_session'
                                        ? 'Rate your session'
                                        : 'Submit Request to Join Session'}
                                </h4>
                            </div>
                            <div className="modal-body text-center">
                                <div id={'ModalBody_' + this.props.firstName}>
                                    {this.state.approval === 'in_session'
                                        ? in_session_html
                                        : this.state.approval === 'pending' ||
                                          this.state.approval === 'new'
                                            ? pending_html
                                            : this.state.approval === 'approved'
                                                ? approved_html
                                                : this.state.approval ===
                                                  'rejected'
                                                    ? rejected_html
                                                    : ''}
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button
                                    type="button"
                                    onClick={
                                        this.state.approval === 'approved'
                                            ? this.handleCancel
                                            : this.handleCloseModal
                                    }
                                    className="btn btn-default mac_button"
                                >
                                    Cancel
                                </button>
                                {this.state.approval === 'in_session' ||
                                this.state.approval === 'new'
                                    ? submitButton
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        studentView: state.studentView
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

const TutorReviewModal = connect(mapStateToProps, mapDispatchToProps)(
    TutorModal
);

export default TutorReviewModal;
