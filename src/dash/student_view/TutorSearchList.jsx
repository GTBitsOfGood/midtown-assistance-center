import React from 'react';
import TutorSearchResult from './TutorSearchResult.jsx';
import { connect } from 'react-redux';

class TutorList extends React.Component {

    render() {
        const renData = this.props.studentView.filteredTutors.length > 0 ? this.props.studentView.filteredTutors.map((obj, num) => {
            return <TutorSearchResult data={obj} id={num} studentEmail={this.props.user.email}/>;
        }) : <h4>No Results Found</h4>;
        const searchResults = <div><h3 className="text-uppercase tutors-header">Search Results for <span className='gold_text'>{"'" + (this.props.studentView.searchSubject ? this.props.studentView.searchSubject + ' ' : '') + this.props.studentView.searchTime + "'"}</span></h3><span><a className="clear-search" href="/dash"><h4>Clear Search</h4></a></span></div>;
        const tutorsOnline = <h3 className="text-uppercase tutors-header">Tutors Currently Online</h3>;
        return (
          <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
            { this.props.studentView.searchType === "online" ? tutorsOnline : searchResults}
            <div className={ "panel-group " + (this.props.studentView.filteredTutors.length > 0 ? "tutors-list" : "")} id="accordion">
              {renData}
            </div>
          </div>
        );
    }

}

const mapStateToProps = (state) => {
  return {
    studentView: state.studentView,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const TutorSearchList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorList);

export default TutorSearchList;