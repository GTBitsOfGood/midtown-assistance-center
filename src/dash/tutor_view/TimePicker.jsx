import React from 'react';

class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleStartChange(event) {
        this.props.handleEditStart(this.props.date, event.target.value, this.props.end);
        //this.setState({start: event.target.value });
    }

    handleEndChange(event) {
        this.props.handleEditEnd(this.props.date, this.props.start, event.target.value);
        //this.setState({end: event.target.value });
    }

    handleDateChange(event) {
        this.props.handleEditDate(this.props.date, event.target.value, this.props.start, this.props.end);
        //this.setState({date: event.target.value});
    }

    handleRemoveClick(event) {
        //this.setState({show:false});
        this.props.handleRemoveSchedule(this.props.date, this.props.start, this.props.end);
    }

    render() {
        const renData = <span>
            <select defaultValue={ this.props.date } value={this.props.date} onChange={ this.handleDateChange } disabled={ !this.props.is_edit }>
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
                <input type="time" value={ this.props.start } onChange={ this.handleStartChange } disabled={ !this.props.is_edit }/>
            </span>
            <span className="time-pick">
                <label>End Time: </label>
                <input type="time" value={ this.props.end } onChange={ this.handleEndChange } disabled={ !this.props.is_edit }/>
            </span>
            <button
                value={this.props.key}
                className="btn btn-danger btn-sm"
                onClick={ this.handleRemoveClick }
                disabled={ !this.props.is_edit }>Remove</button>
        </span>;
        return this.state.show ? renData : null;

    }
}

export default TimePicker;