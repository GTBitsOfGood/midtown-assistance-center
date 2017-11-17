import React from 'react';
import TutorSearchResult from './TutorSearchResult.jsx';
import { connect } from 'react-redux';

class TutorList extends React.Component {

    render() {
        const renData = this.props.filteredTutors.length > 0 ? this.props.filteredTutors.map((obj, num) => {
            return <TutorSearchResult data={obj} id={num}/>;
        }) : <h4>No Results Found</h4>;
        const searchResults = <h3 className="text-uppercase tutors-header">Search Results for <span className='gold_text'>{"'" + (this.props.searchSubject ? this.props.searchSubject + ' ' : '') + this.props.searchTime + "'"}</span></h3>;
        const tutorsOnline = <h3 className="text-uppercase tutors-header">Tutors Currently Online</h3>;
        return (
          <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
            { this.props.searchType === "online" ? tutorsOnline : searchResults}
            <div className={ "panel-group " + (this.props.filteredTutors.length > 0 ? "tutors-list" : "")} id="accordion">
              {renData}
            </div>
          </div>
        );
    }

}

const mapStateToProps = (state) => {
  return state.studentView;
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const TutorSearchList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorList);

export default TutorSearchList;