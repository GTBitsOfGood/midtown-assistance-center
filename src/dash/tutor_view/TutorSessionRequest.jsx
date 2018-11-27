
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TutorUpcomingEvent from './TutorUpcomingEvent';

class TutorRequest extends React.Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.approveRequest = this.approveRequest.bind(this);
        this.denyRequest = this.denyRequest.bind(this);
    }

    approveRequest() {
        let confirm = window.confirm('Are you sure you want to accept this request?');
        if (confirm) {
            const request = {
                _id:this.props.sessionRequest._id,
                status: 'approved'
            };
            const self = this;
            axios
                .post('/api/updateSessionRequest', request)
                .then(function(response) {
                    if (response.data.success) {
                        self.props.getPendingSessionRequests();
                        self.props.setSessionDuration(response.data.sessionRequest);
                        self.props.socket.emit('tutor-approve-request', {request:response.data.sessionRequest});
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

    }

    denyRequest(){
        const reason = window.prompt('Please enter a reason for rejecting the request');
        if (reason) {
            const request = {
                _id:this.props.sessionRequest._id,
                status: 'rejected',
                tutor_comment:reason
            };
            const self = this;
            axios
                .post('/api/updateSessionRequest', request)
                .then(function(response) {
                    if (response.data.success) {
                        self.props.socket.emit('tutor-deny-request', {request:response.data.sessionRequest});
                        self.props.getPendingSessionRequests();
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

    }

    render() {
        return(
            <div className="tutorSessionRequest">
                <div className="tutorSessionRequestTime">
                    <h5 className="request-date">{new Date(this.props.sessionRequest._id.create_time).toLocaleString('en-US')}</h5>
                </div>
                <div className="tutorSessionRequestContent">
                    <img className="tutorSessionRequestImg" src="images/default_user_img.png" />
                </div>
                <div className="tutorSessionRequestContent">
                    <div className="tutorSessionRequestRight">
                        <h4>
                            {this.props.sessionRequest._id.student_id} <span className="lighter-text tutor-request-light">
                             has requested a session in
                            </span> {this.props.sessionRequest.topic}
                        </h4>
                        <h4 className="font-italic tutorSessionRequestDesc lighter-text"><em> "{this.props.sessionRequest.student_comment}" </em></h4>
                    </div>
                </div>
                <div className="tutorSessionRequestContent">
                    <h3 className="approve-deny-student">
                        <span className="glyphicon glyphicon-remove deny-student" onClick={this.denyRequest}/>
                    </h3>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user:state.user
});

const TutorSessionRequest = connect(
    mapStateToProps,
    null
)(TutorRequest);

export default TutorSessionRequest;