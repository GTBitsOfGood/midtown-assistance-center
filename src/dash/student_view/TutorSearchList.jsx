import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TutorSearchResult from './TutorSearchResult';

const TutorList = (props) => {
    const {studentView, socket, user, updateOnlineTutors} = props;
    const renData =
        studentView.filteredTutors.length > 0 ? (
            studentView.filteredTutors.map(tutor => (
                <TutorSearchResult
                    socket={socket}
                    tutor={tutor}
                    id={tutor._id}
                    key={tutor._id}
                    updateTutors={updateOnlineTutors}
                    // TODO: remove next two, it's not used currently
                    studentEmail={user.email}
                    username={user._id}
                />
            ))
        ) : (
            <h4>No Results Found</h4>
        );

    const searchResults = (
        <div>
            <h4 className="tutors-header">
                Search Results for{' '}
                <span className="gold_text">
                    {`'${(studentView.searchSubject ? `${studentView.searchSubject} ` : '')}${studentView.searchTime}'`}
                </span>
            </h4>
            <span>
                <a className="clear-search" href="/dash">
                    <h4><i className="glyphicon glyphicon-remove"></i>Clear Search</h4>
                </a>
            </span>
        </div>
    );
    const tutorsOnline = (
        <h4 className="tutors-header">Tutors Currently Online</h4>
    );
    return (
        <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
            <div className="search-list-header">
                {studentView.searchType === 'online'
                    ? tutorsOnline
                    : searchResults}
            </div>
            <div
                className={`panel-group ${studentView.filteredTutors.length > 0 ? 'tutors-list' : ''}`}
                id="accordion"
            >
                {renData}
            </div>
        </div>
    );
};

TutorList.propTypes = {
    studentView: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateOnlineTutors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    studentView: state.studentView,
    user: state.user
});


const TutorSearchList = connect(mapStateToProps, null)(TutorList);

export default TutorSearchList;
