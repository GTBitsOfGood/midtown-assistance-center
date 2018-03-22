import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';
import axios from 'axios';
import Review from './Review.jsx';

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: {},
            renderSessions: {}
        };
        this.getSessions = this.getSessions.bind(this);
        this.setRenderSessions = this.setRenderSessions.bind(this);
    }

    /**
     * Get all of the sessions for the tutor from the database
     * on mount
     */
    componentWillMount() {
        this.getSessions();
    }

    /**
     * Actual request to get sessions from db
     */
    getSessions() {
        var username = this.props.user._id;
        var self = this;
        axios.post('/api/getTutorSessions', {'username':username})
            .then(function(response){
                if (response.data.success) {
                    console.log(response.data);
                    self.setState({
                        sessions: response.data.sessions,
                        renderSessions: response.data.sessions
                    });
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    /**
     * Set the sessions rendered to those of a certain rating
     * Can be used for filtering in the future
     * @param rating
     */
    setRenderSessions(rating) {
        var renderSessions = [];
        for (var session in this.state.sessions) {
            var newSession = {students_attended: []};
            for (var review in this.state.sessions[session].students_attended) {
                var student_review = this.state.sessions[session].students_attended[review];
                if (student_review.student_rating == rating) {
                    newSession.students_attended.push(student_review);
                }
            }
            renderSessions.push(newSession);
        }
        this.setState({renderSessions: renderSessions});
    }

    /**
     * Create review components for each student review
     * and render them
     * @returns {HTML}
     */
    render() {
        var renSessions = [];
        for (var session in this.state.renderSessions) {
            for (var review in this.state.renderSessions[session].students_attended) {
                var student_review = this.state.renderSessions[session].students_attended[review];
                if (student_review.student_rating !== null) {
                    console.log(student_review.student_rating);
                    renSessions.push(<Review time={student_review.time} rating={student_review.student_rating} comment={student_review.student_comment}/>);
                }
            }
        }
        return (
            <div className="row animated fadeInRight">
                <div className="col">
                    <div className="text-center">
                        <h4 className="lighter-text text-uppercase tutor-events-header"> Feedback</h4>
                    </div>
                    <div className="feedbackWrapper col-xs-12">
                        {renSessions.length == 0 ? <div className="text-center"><h5>You do not have any feedback yet</h5></div> : renSessions}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(updateUser(user))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback);