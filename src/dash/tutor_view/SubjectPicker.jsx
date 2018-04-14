import React from 'react';
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
    this.props.handleEditStart(this.props.index, event.target.value);
  }

  handleEndChange(event) {
    this.props.handleEditEnd(this.props.index, event.target.value);
  }

  handleSubjectChange(event) {
    this.props.handleEditSubject(this.props.index, event.target.value);
    console.log(event.target.value);
  }

  handleRemoveClick(event) {
    this.props.handleRemoveSubject(this.props.index);
  }

  render() {
    let subjectOptions = [];
    if (this.props.subjects.availableSubjects) {
      let subjects = this.props.subjects.availableSubjects.data;
      for (let ind in subjects) {
        subjectOptions.push(
          <option key={ind} value={subjects[ind]._id}>
            {subjects[ind]._id}
          </option>
        );
      }
    }

    const renData = (
      <div className="row input-group col-md-12 col-no-padding">
        <span className="subject-pick col-md-4">
          <label>Subject:</label>
          <select
            className="input input-sm subject-input"
            name="subject"
            value={this.props.subject}
            defaultValue={this.props.subject}
            onChange={this.handleSubjectChange}
            disabled={!this.props.is_edit}
          >
            {subjectOptions}
          </select>
        </span>
        <span className="subject-pick col-md-2">
          <label>Start: </label>
          <input
            className="input input-sm subject-input"
            type="number"
            min="6"
            max="12"
            value={this.props.start}
            onChange={this.handleStartChange}
            disabled={!this.props.is_edit}
          />
        </span>
        <span className="subject-pick col-md-2">
          <label>End: </label>
          <input
            className="input input-sm subject-input"
            type="number"
            min="6"
            max="12"
            value={this.props.end}
            onChange={this.handleEndChange}
            disabled={!this.props.is_edit}
          />
        </span>
        <span className="edit-subject-btn col-md-4">
          <label className="white">: </label>
          <button
            value={this.props.key}
            className="btn btn-danger btn-sm subject-button"
            onClick={this.handleRemoveClick}
            disabled={!this.props.is_edit}
          >
            Remove
          </button>
        </span>
      </div>
    );
    return this.state.show ? renData : null;
  }
}

const mapStateToProps = state => {
  return {
    subjects: state.subjects
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPicker);
