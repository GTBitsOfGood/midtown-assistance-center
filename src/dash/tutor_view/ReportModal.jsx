import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitTutorReportOnFeedback, submitTutorReportInSession } from '../../redux/actions/tutor_actions';

class ReportModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            explanation: '',
            isFeedbackModal: props.rating && props.comment && props.time,
            isInSessionModal: props.student_id,
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeneral = this.handleGeneral.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    handleCancel() {
        $('.modal').modal('hide');
    }

    handleSubmit() {
        const { submitTutorReportOnFeedback, user_id, rating_id, student_id } = this.props;
        const { isFeedbackModal, isInSessionModal } = this.state;
        const { explanation } = this.state;
        if (isFeedbackModal) {
            submitTutorReportOnFeedback(user_id, rating_id, explanation);
        } else if (isInSessionModal) {
            submitTutorReportInSession(user_id, student_id, explanation);
        }
        $('.modal').modal('hide');
    }

    handleGeneral(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { modal_id, time, comment, rating, student_id } = this.props;
        const { isFeedbackModal, isInSessionModal } = this.state;
        const { explanation } = this.state;

        let bodyHtml = null;
        if (isFeedbackModal) {
            bodyHtml = (
                <div className="modal-body text-center">
                    <div id={`ModalBody_${modal_id}`}>
                        Feedback
                        <div>Time: {(new Date(time)).toLocaleString('en-US')}</div>
                        <div>Comment: {comment}</div>
                        <div>Rating: {rating}</div>
                    </div>
                </div>
            );
        } else if (isInSessionModal) {
            bodyHtml = (
                <div className="modal-body text-center">
                    <div id={`ModalBody_${modal_id}`}>
                        In Session
                        <div>Student: {student_id}</div>
                    </div>
                </div>
            );
        }

        return(
            <div>
                <div
                    className="modal"
                    id={`Modal_${modal_id}`}
                    tabIndex="100000"
                    role="dialog"
                    aria-labelledby={`#Modal_${modal_id}Label`}
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
                                    Report!
                                </h4>
                            </div>
                            { bodyHtml }
                            <div className="modal-body text-center">
                                <div id={`ModalBody_${modal_id}`}>
                                    Please explain why you are reporting:
                                    <textarea
                                        type="text"
                                        name="explanation"
                                        rows="5"
                                        value={explanation}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default mac_button"
                                    onClick={this.handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-default mac_button_inverse"
                                    onClick={this.handleSubmit}
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

ReportModal.defaultProps = {
    rating_id: '',
    time: '',
    comment: '',
    rating: 0,
    student_id: '',
};

ReportModal.propTypes = {
    modal_id: PropTypes.string.isRequired,
    rating_id: PropTypes.string,
    time: PropTypes.string,
    comment: PropTypes.string,
    rating: PropTypes.number,
    submitTutorReportOnFeedback: PropTypes.func.isRequired,
    user_id: PropTypes.string.isRequired,
    student_id: PropTypes.string,
};

const mapStateToProps = state => ({
    user_id: state.user._id,
});

const mapDispatchToProps = dispatch => ({
    submitTutorReportOnFeedback: (user_id, rating_id, explanation) => dispatch(submitTutorReportOnFeedback(user_id, rating_id, explanation)),
    submitTutorReportInSession: (user_id, student_id, explanation) => dispatch(submitTutorReportInSession(user_id, student_id, explanation))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportModal);
