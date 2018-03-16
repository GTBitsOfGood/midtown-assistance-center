import React from 'react';
import axios from 'axios';
import SessionReviewModal from './SessionReviewModal.jsx';


class TutorUpcomingEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          hangoutsLink: '',
          hangoutsLinkExpires: ''
        };

        this.handleAccessHangoutLink = this.handleAccessHangoutLink.bind(this);
    }

    handleAccessHangoutLink() {
        let now = new Date();
        let time = now.getHours() + ":" + now.getMinutes();
        let start = new Date();
        let end = new Date();
        let startTimeSplit = this.props.startTime.split(":");
        let endTimeSplit = this.props.endTime.split(":");
        start.setHours(parseInt(startTimeSplit[0]), parseInt(startTimeSplit[1]), 0, 0);
        end.setHours(parseInt(endTimeSplit[0]), parseInt(endTimeSplit[1]), 0, 0);
        if (this.state.hangoutsLink && time.localeCompare(this.props.endTime) < 0) {
            window.open(this.state.hangoutsLink, "_blank");
        } else {
            let sessionRequestBody = {
                _id: {
                    tutor_id: this.props.tutorId,
                    expected_start_time: start,
                 },
                 start_time: now,
                 expected_end_time: end
            }
            let requestBody = {
                sessionRequestBody: sessionRequestBody,
                tutorId: this.props.tutorId,
                calId: this.props.calId,
                startTime: this.props.startTime,
                endTime: this.props.endTime,
                email: this.props.gmail
            };



            let self = this;
            axios.post('/calendar/createEvent', requestBody)
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
    }

    render() {
        let now = new Date();
        let startTimeHour = parseInt(this.props.startTime.split(':')[0]);
        let startTimeMinute = parseInt(this.props.startTime.split(':')[1]);
        let endTimeHour = parseInt(this.props.endTime.split(':')[0]);
        let startTime = startTimeHour%12 + ':' + this.props.startTime.split(':')[1] + (startTimeHour >= 12 ? ' PM' : ' AM');
        let endTime = endTimeHour%12 + ':' + this.props.endTime.split(':')[1] + (endTimeHour >= 12 ? ' PM' : ' AM');
        let active = (startTimeHour - now.getHours() <= 1 && this.props.today);
        const renLogo = active ? <a onClick={this.handleAccessHangoutLink} href="#" data-toggle="modal" data-target={"#Modal_" + this.props.dayName + "_" + this.props.startTime.split(':')[0] + "_" + this.props.endTime.split(':')[0]} className="google-link"><img src="/images/google-icon-active.png"></img></a> : <img className="google-link" src="/images/google-icon-disabled.png"></img>;

        return (
            <div className="tutorUpcomingEvent">
                <div className="tutorUpcomingEventContent">
                    <h3 className="upcoming-event-desc"><strong>{this.props.today ? 'Today' : this.props.dayName}</strong><span className="lighter-text"> from </span><strong>{startTime}</strong><span className="lighter-text"> to </span><strong>{endTime}</strong>
                    </h3>
                    {renLogo}
                </div>
                <SessionReviewModal tutorId={this.props.tutorId} id={this.props.dayName + "_" + this.props.startTime.split(':')[0] + "_" + this.props.endTime.split(':')[0]} hangoutsLink={this.state.hangoutsLink}/>
            </div>
        );
    }
}

export default TutorUpcomingEvent;