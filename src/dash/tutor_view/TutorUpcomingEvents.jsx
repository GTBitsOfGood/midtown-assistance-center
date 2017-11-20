import React from 'react';
import TutorUpcomingEvent from './TutorUpcomingEvent.jsx';

class TutorUpcomingEvents extends React.Component {


  render() {
    let todayDate = new Date();
    let today = todayDate.getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = days[today];
    let count = 0;
    let day = today;
    console.log(dayName);
    let renEvents = []
    let events;
    while (count < 3) {
        events = this.props.availability[dayName]
        for (event in events) {
            renEvents.push(<TutorUpcomingEvent dayName={dayName} today={dayName == days[today] ? true : false} startTime={events[event].start_time} endTime={events[event].end_time}/>);
            count++;
        }
        day++;
        dayName = days[day];
    }
    return (
    <div className="text-center">
        <h2 className="lighter-text text-uppercase tutor-events-header">Upcoming Sessions</h2>
        {renEvents}
        <div className="google-calendar">

        </div>
    </div>
    );
  }
}

export default TutorUpcomingEvents;