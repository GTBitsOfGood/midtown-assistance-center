import React from 'react';
import TutorReviewModal from './TutorReviewModal.jsx';
import axios from 'axios';

class TutorSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullStars:0,
            halfStars:0,
            emptyStars:0,
        };

        this.updateRating = this.updateRating.bind(this);
        this.onHangoutsButton = this.onHangoutsButton.bind(this);
    }

    componentDidMount() {
      this.updateRating();
    }

    updateRating() {
      this.setState({
        halfStars: (this.props.data.rating - Math.floor(this.props.data.rating))/0.5,
        emptyStars: (5 - Math.ceil(this.props.data.rating)),
        fullStars: Math.floor(this.props.data.rating)
      });
    }

    onHangoutsButton() {
      let body = {
        eventId: this.props.data.tutoringEventId,
        email: this.props.studentEmail,
        calendarId: this.props.data.calendarId
      };

      console.log(body);

      let self = this;
      axios.post('/calendar/studentGetHangoutLink', body)
        .then(function(response){
          console.log(response);
          if (response.data.success) {
            self.setState({
              hangoutsLink: response.data.link,
            });
            window.open(response.data.link, "_blank");
          } else {
            console.log(response.data.error);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    render() {
        let stars = [];
        for (let x = 0; x < this.state.fullStars; x++) {
            stars.push(<span><img className="star" src='/images/full-star.png' width="25" height="25"></img></span>);
        }
        for (let y = 0; y < this.state.halfStars; y++) {
            stars.push(<span><img className="star" src='/images/half-star.png' width="25" height="25"></img></span>);
        }
        for (let z = 0; z < this.state.emptyStars; z++) {
            stars.push(<span><img className="star" src='/images/empty-star.png' width="25" height="25"></img></span>);
        }
        return (
            <div>
                <div className="panel panel-default tutor-panel">
                    <div className="panel-heading tutor-panel-heading">
                        <div className="col-md-2">
                            <img className="tutor-profile-pic img-circle" src={this.props.data.profile_picture} height="125" width="125"></img>
                        </div>
                        <div className="">
                            <a data-toggle="collapse" className="tutor-name" data-parent="#accordion" href={'#collapse' + this.props.id}>
                                <h2>
                                    {this.props.data.first_name + ' ' + this.props.data.last_name}
                                    <span className="online-img">
                                        <img src={this.props.data.online ? '/images/status-online.png' : '/images/status-offline.png'}></img>
                                    </span>
                                    &emsp;
                                    {stars}
                                </h2>
                            </a>
                            <h4><strong>Subjects:</strong><span className="lighter-text"> {this.props.data.subjects.map((subject, num) => {return ' ' + subject.subject + '(' + subject.start_grade + '-' + subject.end_grade + ')' + ' ';})}</span></h4>
                            <h4><strong>Availability:</strong><span className="lighter-text"> {Object.keys(this.props.data.availability).map((day, num) => {return (this.props.data.availability[day].length != 0 ? day + '(' + this.props.data.availability[day].map((time, num) => {return ((time.start_time.split(':')[0])%12 + ':' + time.start_time.split(':')[1] + ((time.start_time.split(':'))[0] >= 12 ? ' PM' : ' AM') + '-' + (time.end_time.split(':')[0])%12 + ':' + time.end_time.split(':')[1] + ((time.end_time.split(':'))[0] >= 12 ? ' PM' : ' AM'))}) + ') ': '') })}</span></h4>
                        </div>
                    </div>
                    <div id={'collapse' + this.props.id} className="panel-collapse collapse">
                        <div className="panel-body tutor-panel-body">
                            <div className="tutor_details container col-md-12">
                                <div className="col-md-6">
                                    <h3><strong>Details</strong></h3>
                                    <h4><span><img className="small_img" src='/images/graduate-cap.png'></img></span><strong>{this.props.data.classStanding}</strong> at Georgia Tech</h4>
                                    <h4><span><img className="small_img" src={'/images/' + this.props.data.gender + '.png'}></img></span>{this.props.data.gender}</h4>
                                </div>
                                <div className="col-md-6">
                                    <h3><strong>Bio </strong></h3>
                                    <h4>{this.props.data.bio}</h4>
                                </div>
                            </div>
                            <div className="request_hangout text-center">
                                <h3 className="text-center"><strong>Request a Google Hangouts meeting with {this.props.data.first_name}</strong>
                                </h3>
                                <button className="btn btn-lg btn-default mac_button" type="button" data-toggle="modal" data-target={"#Modal_" + this.props.data.first_name} disabled={!this.props.data.tutoringEventId} onClick={this.onHangoutsButton}>
                                  {this.props.data.tutoringEventId? 'Click Here To Access' : 'Session Not Active'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <TutorReviewModal firstName={this.props.data.first_name}/>
            </div>

        );
    }
}
export default TutorSearchResult;