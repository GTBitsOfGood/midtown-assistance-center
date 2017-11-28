import React from 'react';

class SubjectPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
    }

    handleStartChange(event) {
        this.props.handleEditStart(this.props.index, event.target.value);
    }

    handleEndChange(event) {
        this.props.handleEditEnd(this.props.index, event.target.value);
    }

    handleSubjectChange(event) {
        this.props.handleEditSubject(this.props.index, event.target.value);
    }

    handleRemoveClick(event) {
        this.props.handleRemoveSubject(this.props.index);
    }

    render() {
        const renData = <span>
            <span className="subject-pick">
                <label>Subject: </label>
                <input type="text" value={ this.props.subject } onChange={ this.handleSubjectChange } disabled={ !this.props.is_edit }/>
            </span>
            <span className="time-pick">
                <label>Start Grade: </label>
                <input type="number" min="6" max="12" value={ this.props.start } onChange={ this.handleStartChange } disabled={ !this.props.is_edit }/>
            </span>
            <span className="time-pick">
                <label>End Grade: </label>
                <input type="number" min="6" max="12" value={ this.props.end } onChange={ this.handleEndChange } disabled={ !this.props.is_edit }/>
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

export default SubjectPicker;