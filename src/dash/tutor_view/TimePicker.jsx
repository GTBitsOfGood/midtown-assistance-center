import React from 'react';

class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: this.props.start,
            end: this.props.end
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    handleStartChange(event) {
        this.setState({start: event.target.value });
    }

    handleEndChange(event) {
        this.setState({end: event.target.value });
    }

    render() {
        return (
            <span>
                <select defaultValue={ this.props.date } disabled={ !this.props.is_edit }>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>
                <span className="time-pick">
                    <label>Start Time: </label>
                    <input type="time" value={ this.state.start } onChange={ this.handleStartChange } disabled={ !this.props.is_edit }/>
                </span>
                <span className="time-pick">
                    <label>End Time: </label>
                    <input type="time" value={ this.state.end } onChange={ this.handleEndChange } disabled={ !this.props.is_edit }/>
                </span>
            </span>

        )
    }
}

export default TimePicker;