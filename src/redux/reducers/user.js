import config from 'config';
import * as types from '../actions/types/user_types'
import axios from 'axios';

let initial_state = {};

export default function change_user(state = initial_state, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {
    case types.fetchUserFromDb:
      new_state = action.payload;

      // FIXME Hide password (even though our backend should already hide it)
      // new_state.password = config.hidden_password;
      break;

    case types.saveStudentToDb:
      // FIXME should use thunks for this :/
      new_state = action.payload;

      // FIXME Hide password (even though our backend should already hide it)
      // new_state.password = config.hidden_password;

      // Make save call
      axios.patch('/api/student', new_state)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      break;

    case types.saveTutorToDb:
      // FIXME should use thunks for this :/
      new_state = action.payload;

      // FIXME Hide password (even though our backend should already hide it)
      // new_state.password = config.hidden_password;

      // Make save call
      axios.patch('/api/tutor', new_state)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      break;

    case types.saveAdminToDb:
      // FIXME should use thunks for this :/
      new_state = action.payload;

      // FIXME Hide password (even though our backend should already hide it)
      // new_state.password = config.hidden_password;

      // Make save call
      axios.patch('/api/admin', new_state)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      break;
  }

  return new_state;
}