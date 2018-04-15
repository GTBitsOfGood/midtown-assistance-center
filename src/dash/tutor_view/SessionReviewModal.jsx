/**
 * @file
 * TutorUpcomingEvent.jsx
 *
 * @fileoverview
 * React Component for the Session Review Modal
 * for the tutor to add comments and add a rating
 * for the google hangouts session. It also contains
 * a link to re-enter the session.
 */

import React from 'react';
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
      comment: '',
      students_in_session: []
    };
    this.changeStar = this.changeStar.bind(this);
    this.setRating = this.setRating.bind(this);
    this.changeStarOut = this.changeStarOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.updateStudentInSession = this.updateStudentInSession.bind(this);
  }

    /**
     * SessionModal constructor
     * set up rating stars
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            first_star: false,
            second_star:false,
            third_star:false,
            fourth_star:false,
            fifth_star:false,
            rating: 0,
            satisfaction: '',
            error_message:'hide',
            comment: '',
            students_in_session: []
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
    if (this.state.rating == 0) {
      this.setState({
        first_star: false,
        second_star: false,
        third_star: false,
        fourth_star: false,
        fifth_star: false
      });
    } else if (this.state.rating == 1) {
      this.setState({
        first_star: true,
        second_star: false,
        third_star: false,
        fourth_star: false,
        fifth_star: false
      });
    } else if (this.state.rating == 2) {
      this.setState({
        first_star: true,
        second_star: true,
        third_star: false,
        fourth_star: false,
        fifth_star: false
      });
    } else if (this.state.rating == 3) {
      this.setState({
        first_star: true,
        second_star: true,
        third_star: true,
        fourth_star: false,
        fifth_star: false
      });
    } else if (this.state.rating == 4) {
      this.setState({
        first_star: true,
        second_star: true,
        third_star: true,
        fourth_star: true,
        fifth_star: false
      });
    } else if (this.state.rating == 5) {
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
   * Set the rating to a specific number and
   * set the satisfaction accordingly
   * @param number
   */
  setRating(number) {
    if (number == 1) {
      this.setState({ rating: 1, satisfaction: 'poor' });
    } else if (number == 2) {
      this.setState({ rating: 2, satisfaction: 'below average' });
    } else if (number == 3) {
      this.setState({ rating: 3, satisfaction: 'average' });
    } else if (number == 4) {
      this.setState({ rating: 4, satisfaction: 'very good' });
    } else if (number == 5) {
      this.setState({ rating: 5, satisfaction: 'excellent' });
    }
  }

  /**
   * When the comments/ratings are submitted,
   * end the calendar event and delete the google
   * hangouts event while adding the rating/comment/
   * end time to the tutor session
   */
  // FIXME handle through redux
  handleSubmit() {
    if (this.state.rating == 0) {
      this.setState({ error_message: 'show' });
    } else {
      let onSubmit = this.props.onSubmit;
      let rating = this.state.rating;
      let comment = this.state.comment;
      axios
        .post('/calendar/endCalendarEvent', {
          tutorId: this.props.tutorId
        })
        .then(function(response) {
          if (response.data.success) {
            //this.setState({error_message:'hide'});
            $('.modal').modal('hide');
            onSubmit(rating, comment);
          } else {
            console.log(response.data.error);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  /**
   * Render the TutorModal
   * @returns {HTML}
   */
  render() {
    const renStudents = [];
    this.props.socket.on('session-update-' + this.props.eventId, data => {
      console.log('Session update!');
      this.updateStudentInSession(data);
    });
    for (let student in this.state.students_in_session) {
      console.log(this.state.students_in_session[student]);
      renStudents.push(<h5>{this.state.students_in_session[student].user}</h5>);
    }

  approveStudent(join_request) {
        join_request.status = 'approved';
        let requestBody = {
            _id: this.props.session._id,
            join_request: join_request
        };
        let self = this;
        axios.post('/api/updateJoinRequest', requestBody)
            .then(function(response){
                if (response.data.success) {
                    console.log(response.data);
                    self.props.updateSession(response.data.session.hangouts_link, response.data.session.eventId, response.data.session);
                    self.props.socket.emit('tutor-approve', {'session':response.data.session.eventId});
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });

    }

    denyStudent(join_request) {
        var deny = prompt('Are you sure you want to reject this join request? If so, please enter a reason. If not, please click Cancel.');
        if (deny != null) {
            join_request.status = 'rejected';
            join_request.tutor_comment = deny;
            let requestBody = {
                _id: this.props.session._id,
                join_request: join_request
            };
            let self = this;
            axios.post('/api/updateJoinRequest', requestBody)
                .then(function(response){
                    if (response.data.success) {
                        console.log(response.data);
                        self.props.updateSession(response.data.session.hangouts_link, response.data.session.eventId, response.data.session);
                        self.props.socket.emit('tutor-deny', {'session':response.data.session.eventId, reason: deny});
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

    }

    /**
     * Render the TutorModal
     * @returns {HTML}
     */
    render() {
        const renStudents = [];
        const renRequests = [];

        for (let student in this.props.session.students_attended) {
            renStudents.push(<h5>{this.props.session.students_attended[student].student_id}</h5>);
        }

        for (let student in this.props.session.join_requests) {
            if (this.props.session.join_requests[student].status === "pending") {
                renRequests.push(<div className="student-join-request col-sm-12">
                    <h5 className="col-sm-3">
                        {this.props.session.join_requests[student].student_id}
                    </h5>
                    <h5 className="col-sm-3">
                        {this.props.session.join_requests[student].topic}
                    </h5>
                    <h5 className="lighter-text col-sm-4">
                        {this.props.session.join_requests[student].student_comment ? this.props.session.join_requests[student].student_comment : 'No Request Description'}
                    </h5>
                    <span onClick={() => this.approveStudent(this.props.session.join_requests[student])} className="col-sm-1 glyphicon glyphicon-ok approve-student"></span>
                    <span onClick={() => this.denyStudent(this.props.session.join_requests[student])} className="col-sm-1 glyphicon glyphicon-remove deny-student"></span>
                </div>);
            }
        }

        return (
            <div>
                <div className="modal" id={'Modal_' + this.props.id} tabIndex="1000" role="dialog" aria-labelledby={"#Modal_" + this.props.id + "Label"} aria-hidden="true" autoFocus>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content tutor-modal review-modal">
                            <div className="modal-header text-center">
                                <h4 className="modal-title rate-session-header text-uppercase" id="exampleModalLabel">Session Information</h4>
                                <h5><a href={this.props.session.hangouts_link} target="_blank">Click here to re-enter the hangouts</a></h5>
                            </div>
                            <div className="modal-body tutor-modal-body">
                                <div id={'ModalBody_' + this.props.id}>
                                    <div className="modal-body-session-info">
                                        <h4><small>Student Join Requests</small></h4>
                                        {renRequests.length === 0 ? <h5 className="lighter-text">No Open Join Requests</h5> : renRequests}
                                    </div>
                                    <div className="modal-body-session-info">
                                        <h4><small>Students In Session</small></h4>
                                        {renStudents.length === 0 ? <h5 className="lighter-text">No Students in Session</h5> : renStudents}
                                    </div>
                                    <div className="modal-body-session-rating">
                                        <h4><small>How was your tutoring session?</small></h4>
                                        <h5 className={'text-uppercase modal-error-' + this.state.error_message}>Rating must be nonzero</h5>
                                        <span onMouseOver = {() => this.changeStar(1)} onMouseOut = {this.changeStarOut} onClick={() => this.setRating(1)}><img className="star" src={this.state.first_star ? '/images/full-star.png' : '/images/empty-star.png'} width="25" height="25"/></span>
                                        <span onMouseOver = {() => this.changeStar(2)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(2)}><img className="star" src={this.state.second_star ? '/images/full-star.png' : '/images/empty-star.png'} width="25" height="25"/></span>
                                        <span onMouseOver = {() => this.changeStar(3)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(3)}><img className="star" src={this.state.third_star ? '/images/full-star.png' : '/images/empty-star.png'} width="25" height="25"/></span>
                                        <span onMouseOver = {() => this.changeStar(4)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(4)}><img className="star" src={this.state.fourth_star ? '/images/full-star.png' : '/images/empty-star.png'} width="25" height="25"/></span>
                                        <span onMouseOver = {() => this.changeStar(5)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(5)}><img className="star" src={this.state.fifth_star ? '/images/full-star.png' : '/images/empty-star.png'} width="25" height="25"/></span>
                                        <span><h5 className="rating-span">({this.state.rating}/5) {this.state.satisfaction}</h5></span>
                                        <h5>Leave some comments about any issues or misbehaving students (optional)</h5>
                                        <textarea className="input-sm input feedback-text" value={this.state.comment} onChange={this.handleCommentChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button type="button" className="btn btn-default mac_button" data-dismiss="modal">Close</button>
                                <button type="button" onClick={this.handleSubmit} className="btn btn-default mac_button_inverse">End Session</button>
                            </div>
                        </div>
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

const mapStateToProps = state => {
  return {
    studentView: state.studentView
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const SessionReviewModal = connect(mapStateToProps, mapDispatchToProps)(
  SessionModal
);

export default SessionReviewModal;
