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
                <select defaultValue={ this.props.date }>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                </select>
                <span className="time-pick">
                    <label>Start Time: </label>
                    <input type="time" value={ this.state.start } onChange={ this.handleStartChange }/>
                </span>
                <span className="time-pick">
                    <label>End Time: </label>
                    <input type="time" value={ this.state.end } onChange={ this.handleEndChange }/>
                </span>
            </span>

        )
    }
}

export default TimePicker;