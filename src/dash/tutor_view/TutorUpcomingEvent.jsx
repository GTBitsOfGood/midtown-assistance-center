import React from 'react';

class TutorUpcomingEvent extends React.Component {

  render() {
    const renLogo = this.props.today ? <a href="#" className="google-link"><img src="/images/google-icon-active.png"></img></a> : <img className="google-link" src="/images/google-icon-disabled.png"></img>
    let startTimeHour = parseInt(this.props.startTime.split(":")[0])
    let endTimeHour = parseInt(this.props.endTime.split(":")[0])
    let startTime = startTimeHour%12 + ":" + this.props.startTime.split(":")[1] + (startTimeHour >= 12 ? " PM" : " AM");
    let endTime = endTimeHour%12 + ":" + this.props.endTime.split(":")[1] + (endTimeHour >= 12 ? " PM" : " AM");
    return (
    <div className="tutorUpcomingEvent">
        <div className="tutorUpcomingEventContent">
            <h3 className="upcoming-event-desc"><strong>{this.props.today ? "Today" : this.props.dayName}</strong><span className="lighter-text"> from </span><strong>{startTime}</strong><span className="lighter-text"> to </span><strong>{endTime}</strong>
            </h3>
            {renLogo}
        </div>
    </div>
    );
  }
}

export default TutorUpcomingEvent;