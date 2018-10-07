import React from 'react';
import PropTypes from 'prop-types';
import { HelpBlock } from 'react-bootstrap';

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
        const { handleEditStart, index, end } = this.props;
        const { value } = event.target;
        if (value >= end) {
            this.setState({ invalidStartTime: true }, () => {
                const { invalidStartTime } = this.state;
                handleEditStart(index, value, invalidStartTime);
            });
        } else {
            this.setState({ invalidStartTime: false }, () => {
                const { invalidStartTime } = this.state;
                handleEditStart(index, value, invalidStartTime);
            });
        }
    }

    handleEndChange(event) {
        const { handleEditEnd, index, start } = this.props;
        if (event.target.value <= start) {
            this.setState({ invalidEndTime: true });
        } else {
            this.setState({ invalidEndTime: false });
        }
        const { invalidEndTime } = this.state;
        handleEditEnd(index, event.target.value, invalidEndTime);
    }

    handleDateChange(event) {
        const { handleEditDate, index } = this.props;
        handleEditDate(index, event.target.value);
    }

    // eslint-disable-next-line no-unused-vars
    handleRemoveClick(event) {
        const { handleRemoveSchedule, index } = this.props;
        handleRemoveSchedule(index);
    }

    render() {
        const { date, is_edit, start, end, key } = this.props;
        const { show, invalidStartTime, invalidEndTime } = this.state;
        const invalidTimesError = () =>
            invalidStartTime || invalidEndTime ? (
                <div className="text-danger">
                    Start Time must be before End Time.
                </div>
            ) : null;

        const renData = (
            <div>
                <div className="row input-group">
                    <span className="col-md-4">
                        <label>Day:</label>
                        <select
                            className="time-input input"
                            defaultValue={date}
                            value={date}
                            onChange={this.handleDateChange}
                            disabled={!is_edit}
                        >
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
                        <input
                            className="time-input input"
                            type="time"
                            value={start}
                            onChange={this.handleStartChange}
                            disabled={!is_edit}
                        />
                    </span>
                    <span className="time-pick col-md-3">
                        <label>End Time: </label>
                        <input
                            className="time-input input"
                            type="time"
                            value={end}
                            onChange={this.handleEndChange}
                            disabled={!is_edit}
                        />
                    </span>
                    <span className="col-md-2">
                        <label className="white">:</label>
                        <button
                            type="button"
                            value={key}
                            className="btn btn-danger btn-sm time-button"
                            onClick={this.handleRemoveClick}
                            disabled={!is_edit}
                        >
                            <span className="glyphicon glyphicon-remove" />
                        </button>
                    </span>
                </div>
                {invalidTimesError()}
            </div>
        );
        return show ? renData : null;
    }
}

TimePicker.propTypes = {
    handleEditStart: PropTypes.func.isRequired,
    handleEditEnd: PropTypes.func.isRequired,
    handleEditDate: PropTypes.func.isRequired,
    handleRemoveSchedule: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    is_edit: PropTypes.bool.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired
};

export default TimePicker;
