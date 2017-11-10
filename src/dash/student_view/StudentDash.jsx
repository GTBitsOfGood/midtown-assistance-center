import React from 'react';
import DashSearchBar from './SearchBar.jsx';
import TutorSearchList from './TutorSearchList.jsx';
import {changeTutorsAction, onSearchAction} from '../../redux/actions/student_view_actions';
import { connect } from 'react-redux';
import axios from 'axios';

class StudentDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchClicked = this.handleSearchClicked.bind(this);
        this.updateTutors = this.updateTutors.bind(this);
    }

    componentDidMount() {
        this.updateTutors("online", undefined, undefined);
        this.forceUpdate();
    }

    handleSearchClicked(subject, time) {
        this.updateTutors("searchResults", subject, time);
        this.forceUpdate();
    }

    updateTutors(searchType, subject, time) {
        let self = this;
        let data = {};
        if (searchType !== "online") {
          data = {subject: subject, availability: time};
        }

        axios.get('/api/onlineTutors', {params: data})
          .then(function (response) {
            if (response.data !== '') {
              self.props.changeTutors(response.data);
              self.props.changeSearchDisplay(searchType, subject, time);
            } else {
              console.log(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <div>
                <div className="col-md-12 atlanta">
                    <DashSearchBar handleSearchClicked={this.handleSearchClicked}/>
                </div>
                <TutorSearchList/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTutors: (tutors) => dispatch(changeTutorsAction(tutors)),
    changeSearchDisplay: (search_type, search_subject, search_time) => dispatch(onSearchAction(search_type, search_subject, search_time))
  };
};

const StudentDash = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDashboard);

export default StudentDash;