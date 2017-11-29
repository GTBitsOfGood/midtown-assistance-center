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
        // this.props.handleEditStart(this.props.date, event.target.value, this.props.end, this.props.start);
        this.props.handleEditStart(this.props.index, event.target.value);
        // this.setState({start: event.target.value});
    }

    handleEndChange(event) {
        // this.props.handleEditEnd(this.props.date, this.props.start, event.target.value, this.props.end);
        this.props.handleEditEnd(this.props.index, event.target.value);
        //this.setState({end: event.target.value });
    }

    handleDateChange(event) {
        // this.props.handleEditDate(this.props.date, event.target.value, this.props.start, this.props.end);
        this.props.handleEditDate(this.props.index, event.target.value);
        //this.setState({date: event.target.value});
    }

    handleRemoveClick(event) {
        //this.setState({show:false});
        // this.props.handleRemoveSchedule(this.props.date, this.props.start, this.props.end);
        this.props.handleRemoveSchedule(this.props.index);
    }

    render() {
        const renData = <div className="row input-group">
            <span className="col-md-4">
            <label>Day:</label>
            <select className="time-input input" defaultValue={ this.props.date } value={this.props.date} onChange={ this.handleDateChange } disabled={ !this.props.is_edit }>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
            </select>
            </span>
            <span className="time-pick col-md-3">
                <label>Start Time: </label>
                <input className="time-input input" type="time" value={ this.props.start } onChange={ this.handleStartChange } disabled={ !this.props.is_edit }/>
            </span>
            <span className="time-pick col-md-3">
                <label>End Time: </label>
                <input className="time-input input" type="time" value={ this.props.end } onChange={ this.handleEndChange } disabled={ !this.props.is_edit }/>
            </span>
            <span className="col-md-2">
            <label className="white">:</label>
            <button
                value={this.props.key}
                className="btn btn-danger btn-sm time-button"
                onClick={ this.handleRemoveClick }
                disabled={ !this.props.is_edit }><span className="glyphicon glyphicon-remove"></span></button>
            </span>
        </div>;
        return this.state.show ? renData : null;

    }
}

export default TimePicker;