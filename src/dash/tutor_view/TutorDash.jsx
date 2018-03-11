import React from 'react';
import TutorUpcomingEvents from './TutorUpcomingEvents.jsx';
import { connect } from 'react-redux';
import TutorProfile from './Profile.jsx';

class TutorDash extends React.Component {

    render() {

        return (
            <div className="tutor-dash container col-xs-12">
                <div className="col-md-6">
                    <TutorProfile/>
                </div>
                <div className="col-md-6 upcoming-events-list">
                { this.props.user.approved ?
                    <TutorUpcomingEvents/> :
                    <h4 className="tutor-approval-msg">Your profile is awaiting approval. Edit your profile and check back soon!</h4>
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // Since we never use the redux state here
    console.log(state);
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
)(TutorDash);