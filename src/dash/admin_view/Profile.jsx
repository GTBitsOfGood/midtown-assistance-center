import React from 'react';
import { connect } from 'react-redux';
import {saveAdmin} from "../../redux/actions/user_actions";

class Profile extends React.Component {

  render() {
    return (
      <h1>TODO Admin Profile</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAdmin: (user) => dispatch(saveAdmin(user))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);