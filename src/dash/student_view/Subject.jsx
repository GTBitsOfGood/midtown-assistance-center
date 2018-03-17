import React from 'react';
import { connect } from 'react-redux';

class SubjectComp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const grades = this.props.is_favorite ? '' : ' (' + this.props.start_grade + '-' + this.props.end_grade + ')' + ' ';
        return (
           <span className={this.props.is_favorite ? 'favorite-span' : 'subject-span'}>
           {this.props.subject + grades}
           </span>
        )
    }

}

const mapStateToProps = (state) => {
  return {
    studentView: state.studentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const Subject = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectComp);

export default Subject;