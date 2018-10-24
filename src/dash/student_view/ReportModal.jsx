import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import submitStudentReport from '../../redux/actions/student_view_actions';

class ReportModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            explanation: ''
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
        const { tutor_id, user_id } = this.props;
        const { explanation } = this.state;
        submitStudentReport(tutor_id, user_id, explanation);
        $('.modal').modal('hide');
    }

    handleGeneral(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { tutor_id } = this.props;
        const { explanation } = this.state;
        return(
            <div>
                <div
                    className="modal"
                    id={`Report_Modal_${tutor_id}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby={`#Report_Modal_${tutor_id}Label`}
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
                            <div className="modal-body text-center">
                                <div id={`ReportModalBody_${tutor_id}`}>
                                    Please explain why you are reporting this tutor:
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

ReportModal.propTypes = {
    tutor_id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    user_id: state.user._id,
});

const mapDispatchToProps = dispatch => ({
    submitStudentReport: (tutor_id, user_id, explanation) => dispatch(submitStudentReport(tutor_id, user_id, explanation))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportModal);
