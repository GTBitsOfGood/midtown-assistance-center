import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios/index';

class RequestModal extends React.Component {

    constructor(props) {
        super(props);
        const { subjects } = props;
        this.state = {
            approval: 'new',
            topic: subjects[0] ? subjects[0].subject : '',
            request: '',
            tutor_comment: ''
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleGeneralChange = this.handleGeneralChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const data = {
            student_id: this.props.username,
            tutor_id: this.props.tutorId
        };
        const self = this;
        axios
            .post('/api/getPendingRequestsByTutorAndStudent', {data})
            .then((response) => {
                if (response.data.success) {
                    if (response.data.docs.length > 0) {
                        const sessionRequest = response.data.docs[0];
                        self.setState({
                            approval: sessionRequest.status,
                            request: sessionRequest.student_comment,
                            topic: sessionRequest.topic
                        });
                    }
                } else {
                    console.error(response.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleCancel() {
        $(`#Modal_${this.props.firstName}_request`).modal('hide');
    }

    handleSubmit() {
        const request = {
            _id: {
                student_id: this.props.username,
                tutor_id: this.props.tutorId,
                create_time: Date.now()
            },
            topic: this.state.topic,
            student_comment: this.state.request
        };
        const self = this;
        axios
            .post('/api/createSessionRequest', {sessionRequest:request})
            .then((response) => {
                if (response.data.success) {
                    self.setState({ approval: 'pending' });
                    self.props.socket.emit('new-session-request', {
                        tutor: self.props.tutorId
                    });
                } else {
                    console.error(response.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleGeneralChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        this.props.socket.on(`student-session-request-update-${  this.props.username  }_${  this.props.tutorId}`, (data) => {
            if (data.approval) {
                this.props.showTutorModal();
            } else {
                this.setState({
                    approval: 'rejected',
                    tutor_comment: data.reason
                });
            }
        });

        const subject_select = this.props.subjects.map((subject) => (
            <option>{subject.subject}</option>
        ));
        const favorite_select = this.props.favorites.map((fav) => (
            <option>{fav.favorite}</option>
        ));
        const requestHTML = this.state.approval === 'new' || this.state.approval === 'pending' ?
            <div>
                <h5>What can {this.props.firstName} help you with?</h5>
                <select
                    name="topic"
                    onChange={this.handleGeneralChange}
                    defaultValue={this.state.topic}
                    className="input input-sm"
                >
                    {subject_select}
                    {favorite_select}
                </select>
                <h5>More Details (Optional)</h5>
                <textarea
                    name="request"
                    value={this.state.request}
                    onChange={this.handleGeneralChange}
                    className="input-sm input feedback-text"
                />
                <h6>
                    {this.state.approval === 'new'
                        ? ''
                        : 'Your request is awaiting approval from the tutor'}
                </h6>
            </div> : this.state.approval === 'rejected' ?
                <div>
                    <h4>Your request was rejected because {this.state.tutor_comment}</h4>
                </div>: '';
        return (
            <div>
                <div
                    className="modal"
                    id={`Modal_${this.props.firstName}_request`}
                    tabIndex="1000"
                    role="dialog"
                    aria-labelledby={`#Modal_${this.props.firstName}_requestLabel`}
                    aria-hidden="true"
                    autoFocus
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content review-modal">
                            <div className="modal-header text-center">
                                <h4>Request a Session with {this.props.firstName}</h4>
                            </div>
                            <div className="modal-body text-center">
                                <div id={`ModalBody_${this.props.firstName}_request`}>
                                    {requestHTML}
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button
                                    type="button"
                                    onClick={
                                        this.handleCancel
                                    }
                                    className="btn btn-default mac_button"
                                >Cancel</button>
                                { this.state.approval !== 'pending' && this.state.approval !== 'rejected' ?
                                    <button
                                        type="submit"
                                        onClick={
                                            this.handleSubmit
                                        }
                                        className="btn btn-default mac_button_inverse"
                                    >
                                        Submit
                                    </button> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    studentView: state.studentView
});

const TutorRequestModal = connect(
    mapStateToProps,
    null
)(RequestModal);

export default TutorRequestModal;
