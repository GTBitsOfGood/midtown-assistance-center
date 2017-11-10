import React from 'react';
import TutorSearchResult from './TutorSearchResult.jsx';
import { connect } from 'react-redux';

class TutorList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        const renData = this.props.studentView.filteredTutors.length > 0 ? this.props.studentView.filteredTutors.map((obj, num) => {
            return <TutorSearchResult data={obj} id={num}/>;
        }) : <h4>No Results Found</h4>;

        return (
            <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
                <h3 className="text-uppercase tutors-header">
                { this.props.studentView.searchType === "online" ? "Tutors Currently Online" : "Search Results for "}
                <span className='gold_text'>
                { this.props.studentView.searchType === "online" ? "" : this.props.studentView.searchSubject + " " + this.props.studentView.searchTime }
                </span>
                </h3>
                 <div className={ "panel-group " + (this.props.studentView.filteredTutors.length > 0 ? "tutors-list" : "")} id="accordion">
                  {renData}
                 </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const TutorSearchList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorList);

export default TutorSearchList;