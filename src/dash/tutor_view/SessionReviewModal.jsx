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
            second_star:false,
            third_star:false,
            fourth_star:false,
            fifth_star:false,
            rating: 0,
            satisfaction: '',
            error_message:'hide',
            comment: ''
        };
        this.changeStar = this.changeStar.bind(this);
        this.setRating = this.setRating.bind(this);
        this.changeStarOut = this.changeStarOut.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    /**
     * Handle a change in the comments textarea
     * @param e
     */
    handleCommentChange(e) {
        this.setState({comment: e.target.value});
    }

    /**
     * Change the colored stars when the mouse hovers over
     * a new star
     * @param number
     */
    changeStar(number) {
        if (number == 1) {
            this.setState({first_star:true,second_star:false,third_star:false,fourth_star:false,fifth_star:false});
        } else if (number == 2) {
            this.setState({first_star:true,second_star:true,third_star:false,fourth_star:false,fifth_star:false});
        } else if (number == 3) {
            this.setState({first_star:true,second_star:true,third_star:true,fourth_star:false,fifth_star:false});
        } else if (number == 4) {
            this.setState({first_star:true,second_star:true,third_star:true,fourth_star:true,fifth_star:false});
        } else if (number == 5) {
            this.setState({first_star:true,second_star:true,third_star:true,fourth_star:true,fifth_star:true});
        }
    }

    /**
     * Empty colored stars when the mouse hovers away
     * from a star
     */
    changeStarOut() {
        if (this.state.rating == 0) {
            this.setState({first_star:false,second_star:false,third_star:false,fourth_star:false,fifth_star:false});
        } else if (this.state.rating == 1) {
            this.setState({first_star:true,second_star:false,third_star:false,fourth_star:false,fifth_star:false});
        } else if (this.state.rating == 2) {
            this.setState({first_star:true,second_star:true,third_star:false,fourth_star:false,fifth_star:false});
        } else if (this.state.rating == 3) {
            this.setState({first_star:true,second_star:true,third_star:true,fourth_star:false,fifth_star:false});
        } else if (this.state.rating == 4) {
            this.setState({first_star:true,second_star:true,third_star:true,fourth_star:true,fifth_star:false});
        } else if (this.state.rating == 5) {
            this.setState({first_star:true,second_star:true,third_star:true,fourth_star:true,fifth_star:true});
        }

    }

    /**
     * Set the rating to a specific number and
     * set the satisfaction accordingly
     * @param number
     */
    setRating(number) {
        if (number == 1) {
            this.setState({rating:1, satisfaction:'poor'});
        } else if (number == 2) {
            this.setState({rating:2, satisfaction:'below average'});
        } else if (number == 3) {
            this.setState({rating:3, satisfaction:'average'});
        } else if (number == 4) {
            this.setState({rating:4, satisfaction:'very good'});
        } else if (number == 5) {
            this.setState({rating:5, satisfaction:'excellent'});
        }
    }

    /**
     * When the comments/ratings are submitted,
     * end the calendar event and delete the google
     * hangouts event while adding the rating/comment/
     * end time to the tutor session
     */
    handleSubmit() {
        if (this.state.rating == 0) {
            this.setState({error_message:'show'});
        } else {
            let onSubmit = this.props.onSubmit;
            let rating = this.state.rating;
            let comment = this.state.comment;
            axios.post('/calendar/endCalendarEvent', {
                tutorId: this.props.tutorId
            })
                .then(function(response){
                    if (response.data.success) {
                        //this.setState({error_message:'hide'});
                        $('.modal').modal('hide');
                        onSubmit(rating, comment);
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    }

    /**
     * Render the TutorModal
     * @returns {HTML}
     */
    render() {
        return (
            <div>
                <div className="modal" id={'Modal_' + this.props.id} tabindex="1000" role="dialog" aria-labelledby={"#Modal_" + this.props.id + "Label"} aria-hidden="true" autofocus>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content tutor-modal review-modal">
                            <div className="modal-header text-center">
                                <h3 className="modal-title rate-session-header text-uppercase" id="exampleModalLabel">Rate your session</h3>
                            </div>
                            <div className="modal-body text-center">
                                <div id={'ModalBody_' + this.props.id}>
                                    <h2>How was your tutoring session?</h2>
                                    <h5 className={'text-uppercase modal-error-' + this.state.error_message}>Rating must be nonzero</h5>
                                    <span onMouseOver = {() => this.changeStar(1)} onMouseOut = {this.changeStarOut} onClick={() => this.setRating(1)}><img className="star" src={this.state.first_star ? '/images/full-star.png' : '/images/empty-star.png'} width="40" height="40"></img></span>
                                    <span onMouseOver = {() => this.changeStar(2)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(2)}><img className="star" src={this.state.second_star ? '/images/full-star.png' : '/images/empty-star.png'} width="40" height="40"></img></span>
                                    <span onMouseOver = {() => this.changeStar(3)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(3)}><img className="star" src={this.state.third_star ? '/images/full-star.png' : '/images/empty-star.png'} width="40" height="40"></img></span>
                                    <span onMouseOver = {() => this.changeStar(4)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(4)}><img className="star" src={this.state.fourth_star ? '/images/full-star.png' : '/images/empty-star.png'} width="40" height="40"></img></span>
                                    <span onMouseOver = {() => this.changeStar(5)} onMouseOut = {this.changeStarOut}  onClick={() => this.setRating(5)}><img className="star" src={this.state.fifth_star ? '/images/full-star.png' : '/images/empty-star.png'} width="40" height="40"></img></span>
                                    <span><h3 className="rating-span">({this.state.rating}/5) {this.state.satisfaction}</h3></span>
                                    <h5><a href={this.props.hangoutsLink} target="_blank">Click here to re-enter the hangouts</a></h5>
                                    <h5>Leave some comments about any issues or misbehaving students (optional)</h5>
                                    <textarea className="input-lg input feedback-text" value={this.state.comment} onChange={this.handleCommentChange}></textarea>
                                </div>
                            </div>
                            <div className="review-modal-footer modal-footer">
                                <button type="button" className="btn btn-default mac_button" data-dismiss="modal">Cancel</button>
                                <button type="button" onClick={this.handleSubmit} className="btn btn-default mac_button_inverse">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        studentView: state.studentView
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const SessionReviewModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionModal);

export default SessionReviewModal;