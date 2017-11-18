import React from 'react';
import { connect } from 'react-redux';
import {saveUser} from "../../redux/actions/user_actions";

class Profile extends React.Component {

  render() {
    return (
      <h1>TODO Admin Profile</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return state.user;
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser : (user) => dispatch(saveUser(user))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);