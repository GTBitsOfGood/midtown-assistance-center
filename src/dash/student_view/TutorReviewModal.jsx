import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';

class TutorModal extends React.Component {
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
        this.handleCancel = this.handleCancel.bind(this);
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

    handleCancel() {
        let now = new Date();
        let studentRatingObj = {
            student_id: this.props.username,
            time: now
        };
        let request = {
            _id: this.props.session._id,
            review: studentRatingObj
        };
        axios
            .post('/api/studentSubmitReview', request)
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

    handleSubmit() {
        if (this.state.rating === 0) {
            this.setState({ error_message: 'show' });
        } else {
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
            axios
                .post('/api/studentSubmitReview', request)
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

    render() {
        const modalName = '#Modal_' + this.props.firstName;
        const modalBody = '#ModalBody_' + this.props.firstName;
        return (
            <div>
                <div
                    className="modal"
                    id={'Modal_' + this.props.firstName}
                    tabindex="1000"
                    role="dialog"
                    aria-labelledby={'#Modal_' + this.props.firstName + 'Label'}
                    aria-hidden="true"
                    autofocus
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content review-modal">
                            <div className="modal-header text-center">
                                <h3
                                    className="modal-title rate-session-header text-uppercase"
                                    id="exampleModalLabel"
                                >
                                    Rate your session
                                </h3>
                            </div>
                            <div className="modal-body text-center">
                                <div id={'ModalBody_' + this.props.firstName}>
                                    {this.props.session ? (
                                        <h5>
                                            <a
                                                href={
                                                    this.props.session
                                                        .hangouts_link
                                                }
                                                target="_blank"
                                            >
                                                Click here to re-enter the
                                                hangouts
                                            </a>
                                        </h5>
                                    ) : (
                                        ''
                                    )}
                                    <h2>
                                        How was your tutoring session with{' '}
                                        {this.props.firstName}?
                                    </h2>
                                    <h5
                                        className={
                                            'text-uppercase modal-error-' +
                                            this.state.error_message
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
                                            width="40"
                                            height="40"
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
                                            width="40"
                                            height="40"
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
                                            width="40"
                                            height="40"
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
                                            width="40"
                                            height="40"
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
                                            width="40"
                                            height="40"
                                        />
                                    </span>
                                    <span>
                                        <h3 className="rating-span">
                                            ({this.state.rating}/5){' '}
                                            {this.state.satisfaction}
                                        </h3>
                                    </span>
                                    <h5>Leave some feedback (optional)</h5>
                                    <textarea
                                        value={this.state.comment}
                                        onChange={this.handleCommentChange}
                                        className="input-lg input feedback-text"
                                    />
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button
                                    type="button"
                                    onClick={this.handleCancel}
                                    className="btn btn-default mac_button"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={this.handleSubmit}
                                    className="btn btn-default mac_button_inverse"
                                >
                                    Submit
                                </button>
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
