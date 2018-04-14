/**
 * @file
 * TutorUpcomingEvent.jsx
 *
 * @fileoverview
 * React component for an upcoming event on the tutor dash.
 * The google hangouts link is active if the event is within
 * the hour.
 */

import React from 'react';
import axios from 'axios';
import SessionReviewModal from './SessionReviewModal.jsx';

class TutorUpcomingEvent extends React.Component {
  /**
   * Set the hangouts link in the state and bind functions
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      hangoutsLink: '',
      hangoutsLinkExpires: '',
      eventId: ''
    };

    this.handleAccessHangoutLink = this.handleAccessHangoutLink.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  /**
   * submit the tutor review, update the rating and comment for the
   * tutor session in the database
   * @param rating
   * @param comment
   */
  submitReview(rating, comment) {
    let now = new Date();
    let start = new Date();
    let startTimeSplit = this.props.startTime.split(':');
    start.setHours(
      parseInt(startTimeSplit[0]),
      parseInt(startTimeSplit[1]),
      0,
      0
    );
    let sessionRequestBody = {
      _id: {
        expected_start_time: start,
        tutor_id: this.props.tutorId
      },
      rating: rating,
      comment: comment,
      end_time: now
    };
    axios
      .post('/api/tutorSubmitReview', sessionRequestBody)
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
  }

  /**
   * when the tutor requests access to the hangouts link,
   * send a request to the createEvent function with the start time
   * and end time of the session and either get the already created
   * link or create a new one.
   */
  handleAccessHangoutLink() {
    let now = new Date();
    let time = now.getHours() + ':' + now.getMinutes();
    let start = new Date();
    let end = new Date();
    let startTimeSplit = this.props.startTime.split(':');
    let endTimeSplit = this.props.endTime.split(':');
    start.setHours(
      parseInt(startTimeSplit[0]),
      parseInt(startTimeSplit[1]),
      0,
      0
    );
    end.setHours(parseInt(endTimeSplit[0]), parseInt(endTimeSplit[1]), 0, 0);

    if (this.state.hangoutsLink && time.localeCompare(this.props.endTime) < 0) {
      window.open(this.state.hangoutsLink, '_blank');
    } else {
      let sessionRequestBody = {
        _id: {
          tutor_id: this.props.tutorId,
          expected_start_time: start
        },
        start_time: now,
        expected_end_time: end
      };
      let requestBody = {
        sessionRequestBody: sessionRequestBody,
        tutorId: this.props.tutorId,
        calId: this.props.calId,
        startTime: this.props.startTime,
        endTime: this.props.endTime,
        email: this.props.gmail
      };

      let self = this;
      axios
        .post('/calendar/createEvent', requestBody)
        .then(function(response) {
          if (response.data.success) {
            self.setState({
              hangoutsLink: response.data.link,
              eventId: response.data.id
            });
            window.open(response.data.link, '_blank');
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
   * Render the tutor upcoming event component
   * @returns {HTML}
   */
  render() {
    let now = new Date();
    let startTimeHour = parseInt(this.props.startTime.split(':')[0]);
    let endTimeHour = parseInt(this.props.endTime.split(':')[0]);
    let startTime =
      startTimeHour % 12 +
      ':' +
      this.props.startTime.split(':')[1] +
      (startTimeHour >= 12 ? ' PM' : ' AM');
    let endTime =
      endTimeHour % 12 +
      ':' +
      this.props.endTime.split(':')[1] +
      (endTimeHour >= 12 ? ' PM' : ' AM');
    let active = startTimeHour - now.getHours() <= 1 && this.props.today;
    const renLogo = active ? (
      <a
        onClick={this.handleAccessHangoutLink}
        href="#"
        data-toggle="modal"
        data-target={
          '#Modal_' +
          this.props.dayName +
          '_' +
          this.props.startTime.split(':')[0] +
          '_' +
          this.props.endTime.split(':')[0]
        }
      >
        <img className="google-link" src="/images/google-icon-active.png" />
      </a>
    ) : (
      <img className="google-link" src="/images/google-icon-disabled.png" />
    );

    return (
      <div className="tutorUpcomingEvent">
        <div className="tutorUpcomingEventContent">
          <h4 className="upcoming-event-desc">
            {this.props.today ? 'Today' : this.props.dayName}
            <span className="upcoming-event-light lighter-text"> from </span>
            {startTime}
            <span className="upcoming-event-light lighter-text"> to </span>
            {endTime}
          </h4>
        </div>
        <div className="tutorUpcomingEventContent">{renLogo}</div>
        <SessionReviewModal
          socket={this.props.socket}
          onSubmit={this.submitReview}
          tutorId={this.props.tutorId}
          id={
            this.props.dayName +
            '_' +
            this.props.startTime.split(':')[0] +
            '_' +
            this.props.endTime.split(':')[0]
          }
          hangoutsLink={this.state.hangoutsLink}
          eventId={this.state.eventId}
        />
      </div>
    );
  }
}

export default TutorUpcomingEvent;
