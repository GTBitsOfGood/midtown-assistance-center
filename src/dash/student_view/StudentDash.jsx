import React from 'react';
import DashSearchBar from './SearchBar.jsx';
import TutorSearchList from './TutorSearchList.jsx';
import {changeTutorsAction, onSearchAction} from '../../redux/actions/student_view_actions';
import { connect } from 'react-redux';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const SOCKETIO_ENDPOINT = 'http://localhost:3000'
const socket = socketIOClient(SOCKETIO_ENDPOINT);

class StudentDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchType: 'online',
          subject: undefined,
          time: undefined
        };

        this.handleSearchClicked = this.handleSearchClicked.bind(this);
        this.updateTutors = this.updateTutors.bind(this);
    }

    componentWillMount() {
        this.updateTutors();
    }

    handleSearchClicked(subject, time) {
        // NOTE don't use this.setState because we don't want to re-render here
        this.state = {
          searchType: 'searchResults',
          subject: subject,
          time: time
        };
        this.updateTutors();
    }

    updateTutors() {
        let searchType = this.state.searchType;
        let subject = this.state.subject;
        let time = this.state.time;

        let self = this;
        let data = {};
        if (searchType !== "online") {
          data = {subject: subject, availability: time};
        }

        axios.get('/api/onlineTutors', {params: data})
          .then(function (response) {
            if (response.data) {
              self.props.changeTutors(response.data);
              self.props.changeSearchDisplay(searchType, subject, time);
            } else {
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {

        socket.on('update-tutors', () => {
            console.log("Tutor update!");
            window.location.reload();
        });
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

function mapStateToProps (state) {
  // Note we don't use the redux state in this component
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    changeTutors: (tutors) => dispatch(changeTutorsAction(tutors)),
    changeSearchDisplay: (search_type, search_subject, search_time) => dispatch(onSearchAction(search_type, search_subject, search_time))
  };
}

const StudentDash = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDashboard);

export default StudentDash;