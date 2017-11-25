import React from 'react';
import TutorUpcomingEvents from './TutorUpcomingEvents.jsx';
import { connect } from 'react-redux';
import TutorProfile from './Profile.jsx';

class TutorDash extends React.Component {

    render() {
        return (
            <div className="tutor-dash container col-xs-12">
                <div className="col-md-7">
                    <TutorProfile/>
                </div>
                <div className="col-md-5 upcoming-events-list">
                    <TutorUpcomingEvents/>
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