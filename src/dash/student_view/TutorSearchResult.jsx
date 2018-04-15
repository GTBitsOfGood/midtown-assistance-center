import React from 'react';
import TutorReviewModal from './TutorReviewModal.jsx';
import Subject from './Subject.jsx';
import axios from 'axios';
import Availability from './Availability.jsx';
import socketIOClient from 'socket.io-client';

class TutorSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullStars: 0,
      halfStars: 0,
      emptyStars: 0
    };

    this.updateRating = this.updateRating.bind(this);
    this.onHangoutsButton = this.onHangoutsButton.bind(this);
  }

  componentDidMount() {
    this.updateRating();
  }

  updateRating() {
    this.setState({
      halfStars: Math.floor(
        (this.props.data.rating - Math.floor(this.props.data.rating)) / 0.5
      ),
      emptyStars: 5 - Math.ceil(this.props.data.rating),
      fullStars: Math.floor(this.props.data.rating)
    });
  }

  onHangoutsButton() {
    this.setState({ hangoutsLink: this.props.data.session.hangouts_link });
    //window.open(this.props.data.session.hangouts_link, '_blank');
    //this.props.socket.emit('student-join', {'session':this.props.data.session.eventId, 'student': this.props.username});
  }

  render() {
    let subjects = this.props.data.subjects.map((subject, num) => {
      return (
        <Subject
          is_favorite={false}
          subject={subject.subject}
          start_grade={subject.start_grade}
          end_grade={subject.end_grade}
        />
      );
    });
    let favorites = this.props.data.favorites.map((fav, num) => {
      return <Subject is_favorite={true} subject={fav.favorite} />;
    });
    let stars = [];
    let date = new Date(this.props.data.join_date).toLocaleDateString();
    for (let x = 0; x < this.state.fullStars; x++) {
      stars.push(
        <span>
          <img
            className="star"
            src="/images/full-star.png"
            width="25"
            height="25"
          />
        </span>
      );
    }
    for (let y = 0; y < this.state.halfStars; y++) {
      stars.push(
        <span>
          <img
            className="star"
            src="/images/half-star.png"
            width="25"
            height="25"
          />
        </span>
      );
    }
    for (let z = 0; z < this.state.emptyStars; z++) {
      stars.push(
        <span>
          <img
            className="star"
            src="/images/empty-star.png"
            width="25"
            height="25"
          />
        </span>
      );
    }
    return (
      <div>
        <div className="panel panel-default tutor-panel">
          <div className="panel-heading tutor-panel-heading">
            <div className="col-md-2">
              <img
                className="tutor-profile-pic img-circle"
                src={this.props.data.profile_picture}
                height="125"
                width="125"
              />
            </div>
            <div className="">
              <a
                data-toggle="collapse"
                className="tutor-name"
                data-parent="#accordion"
                href={'#collapse' + this.props.id}
              >
                <h3 className="">
                  {this.props.data.first_name + ' ' + this.props.data.last_name}
                  <span className="online-img">
                    <img
                      className="online-ic"
                      src={
                        this.props.data.online
                          ? '/images/status-online.png'
                          : '/images/status-offline.png'
                      }
                    />
                  </span>
                  &emsp;
                  {stars}
                </h3>
              </a>
              <h4 className="tutor-subjects lighter-text">
                Main Subjects:
                <span>{subjects}</span>
              </h4>
              <h4 className="tutor-favorites lighter-text">
                Favorites:
                <span>{favorites}</span>
              </h4>
            </div>
          </div>
          <div
            id={'collapse' + this.props.id}
            className="panel-collapse collapse"
          >
            <div className="panel-body tutor-panel-body">
              <div className="tutor_details container col-md-12">
                <div className="col-md-6">
                  <h4>
                    <strong>Details</strong>
                  </h4>
                  <h4 className="details">
                    <span className="details-ic glyphicon glyphicon-briefcase" />
                    <strong> Student</strong> at Georgia Tech
                  </h4>
                  <h4 className="details">
                    <span className="details-ic glyphicon glyphicon-calendar" />
                    <strong>{date}</strong> Join Date
                  </h4>
                  <h4 className="details">
                    <span className="details-ic glyphicon glyphicon-star" />
                    <strong> {this.props.data.rating}</strong> rating out of{' '}
                    {this.props.data.num_ratings} total ratings
                  </h4>
                  <h4 className="availability-info">
                    <strong>Availability</strong>
                  </h4>
                  <Availability availability={this.props.data.availability} />
                </div>
                <div className="col-md-6">
                  <h4>
                    <strong>Bio</strong>
                  </h4>
                  <h4 className="bio-text lighter-text">
                    {this.props.data.bio}
                  </h4>
                </div>
              </div>
              <div className="request_hangout text-center">
                <h4 className="text-center">
                  <strong>
                    Request a Google Hangouts meeting with{' '}
                    {this.props.data.first_name}
                  </strong>
                </h4>
                <button
                  className="btn btn-md btn-default mac_button"
                  type="button"
                  data-toggle="modal"
                  data-target={'#Modal_' + this.props.data.first_name}
                  data-backdrop="static"
                  disabled={!this.props.data.session}
                  onClick={this.onHangoutsButton}
                >
                  {this.props.data.session
                    ? 'Click Here To Access'
                    : 'Session Not Active'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <TutorReviewModal
          updateTutors={this.props.updateTutors}
          socket={this.props.socket}
          username={this.props.username}
          subjects={this.props.data.subjects}
          favorites={this.props.data.favorites}
          firstName={this.props.data.first_name}
          session={this.props.data.session}
        />
      </div>
    );
  }
}
export default TutorSearchResult;
