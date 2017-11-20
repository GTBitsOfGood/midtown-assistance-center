import React from 'react';

class TutorUpcomingEvent extends React.Component {

  render() {
    return (
    <div className="tutorUpcomingEvent">
        <div className="tutorUpcomingEventContent">
            <h3 className="upcoming-event-desc"><strong>{this.props.today ? "Today" : this.props.dayName}</strong><span className="lighter-text"> from </span><strong>{this.props.startTime}</strong><span className="lighter-text"> to </span><strong>{this.props.endTime}</strong>
            </h3>
            <a href="#" className="google-link">
            <img src={this.props.today ? "/images/google-icon-active.png" : "/images/google-icon-disabled.png"}>
            </img>
            </a>
        </div>
    </div>
    );
  }
}

export default TutorUpcomingEvent;