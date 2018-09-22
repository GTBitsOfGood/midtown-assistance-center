import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        const { handleEditStart, index } = this.props;
        handleEditStart(index, event.target.value);
    }

    handleEndChange(event) {
        const { handleEditEnd, index } = this.props;
        handleEditEnd(index, event.target.value);
    }

    handleSubjectChange(event) {
        const { handleEditSubject, index } = this.props;
        handleEditSubject(index, event.target.value);
        console.log(event.target.value);
    }

    // eslint-disable-next-line no-unused-vars
    handleRemoveClick(event) {
        const { handleRemoveSubject, index } = this.props;
        handleRemoveSubject(index);
    }

    render() {
        const { subjects, subject, is_edit, start, end, key } = this.props;
        const { show } = this.state;

        const subjectOptions = subjects.availableSubjects.map(subj => (
            <option value={subj} key={subj}>
                {subj}
            </option>
        ));

        const renData = (
            <div className="row input-group">
                <span className="subject-pick col-md-4">
                    <label>Subject:</label>
                    <select
                        className="input input-sm subject-input"
                        name="subject"
                        value={subject}
                        defaultValue={subject}
                        onChange={this.handleSubjectChange}
                        disabled={!is_edit}
                    >
                        {subjectOptions}
                    </select>
                </span>
                <span className="subject-pick col-md-2">
                    <label>Start: </label>
                    <input
                        className="input input-sm subject-input"
                        type="number"
                        min="1"
                        max={end}
                        value={start}
                        onChange={this.handleStartChange}
                        disabled={!is_edit}
                    />
                </span>
                <span className="subject-pick col-md-2">
                    <label>End: </label>
                    <input
                        className="input input-sm subject-input"
                        type="number"
                        min={start}
                        max="12"
                        value={end}
                        onChange={this.handleEndChange}
                        disabled={!is_edit}
                    />
                </span>
                <span className="edit-subject-btn col-md-4">
                    <label className="white">: </label>
                    <button
                        type="button"
                        value={key}
                        className="btn btn-danger btn-sm subject-button"
                        onClick={this.handleRemoveClick}
                        disabled={!is_edit}
                    >
                        Remove
                    </button>
                </span>
            </div>
        );
        return show ? renData : null;
    }
}

SubjectPicker.propTypes = {
    handleEditEnd: PropTypes.func.isRequired,
    handleEditStart: PropTypes.func.isRequired,
    handleEditSubject: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    handleRemoveSubject: PropTypes.func.isRequired,
    subjects: PropTypes.object.isRequired,
    subject: PropTypes.string.isRequired,
    is_edit: PropTypes.bool.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    subjects: state.subjects
});

export default connect(
    mapStateToProps,
    null
)(SubjectPicker);
