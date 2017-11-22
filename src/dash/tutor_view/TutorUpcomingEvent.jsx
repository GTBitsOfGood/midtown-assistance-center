import React from 'react';

class TutorUpcomingEvent extends React.Component {

  render() {
    const renLogo = this.props.today ? <a href="#" className="google-link"><img src="/images/google-icon-active.png"></img></a> : <img className="google-link" src="/images/google-icon-disabled.png"></img>
    return (
    <div className="tutorUpcomingEvent">
        <div className="tutorUpcomingEventContent">
            <h3 className="upcoming-event-desc"><strong>{this.props.today ? "Today" : this.props.dayName}</strong><span className="lighter-text"> from </span><strong>{this.props.startTime}</strong><span className="lighter-text"> to </span><strong>{this.props.endTime}</strong>
            </h3>
            {renLogo}
        </div>
    </div>
    );
  }
}

export default TutorUpcomingEvent;