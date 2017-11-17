import config from 'config';
import * as types from '../actions/types/user_types'
import axios from 'axios';

let initial_state = {};

export default function change_user(state = initial_state, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {
    case types.updateUser:
      new_state = action.payload;

      // Hide password (even though our backend should already hide it)
      new_state.password = config.hidden_password;
      break;

    case types.saveUserToDb:
      // FIXME should use thunks for this :/
      new_state = action.payload;

      // Hide password (even though our backend should already hide it)
      new_state.password = config.hidden_password;

      // Make save call
      axios.post('/saveUser', new_state)
        .then(function (response) {
          if (response.data !== '') {
            // Do nothing
          } else {
            console.error('Dashboard received no user info');
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      break;
  }

  return new_state;
}