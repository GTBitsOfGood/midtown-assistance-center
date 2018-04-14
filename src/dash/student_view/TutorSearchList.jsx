import React from 'react';
import TutorSearchResult from './TutorSearchResult.jsx';
import { connect } from 'react-redux';

class TutorList extends React.Component {

    render() {
        const renData = this.props.studentView.filteredTutors.length > 0 ? this.props.studentView.filteredTutors.map((obj, num) => {
            return <TutorSearchResult socket={this.props.socket} data={obj} id={num} studentEmail={this.props.user.email} username={this.props.user._id}/>;
        }) : <h4>No Results Found</h4>;
        const searchResults = <div><h4 className="tutors-header">Search Results for <span className='gold_text'>{"'" + (this.props.studentView.searchSubject ? this.props.studentView.searchSubject + ' ' : '') + this.props.studentView.searchTime + "'"}</span></h4><span><a className="clear-search" href="/dash"><h4>Clear Search</h4></a></span></div>;
        const tutorsOnline = <h4 className="tutors-header">Tutors Currently Online</h4>;
        return (
          <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
          <div className="search-list-header">
            { this.props.studentView.searchType === "online" ? tutorsOnline : searchResults}
          </div>
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